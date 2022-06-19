const show3DModelBtn = document.querySelector('#show3DModelBtn');

const CSW_3D_SERVICE_URL = '<PYCSW-3D-SERVICE_URL>/csw';
const TOKEN_3D = '<API_KEY>';
const INJECTION_TYPE = '<INJECTION_TYPE>';

// according to defined B2B authentication principles HEADER or QUERYPARAM
const getAuthObject = () => {
  const tokenProps = {};
  if (INJECTION_TYPE.toLowerCase() === 'header') {
    tokenProps.headers = {
      'X-API-KEY': RASTER_TOKEN
    };
  } else if (INJECTION_TYPE.toLowerCase() === 'queryparam') {
    tokenProps.queryParameters = {
      'token': RASTER_TOKEN
    };
  }
  return tokenProps;
}

const showLoaderContainer = (show) => {
  document.getElementById('loader').style.display = !show ? 'none' : '';
}

const showLoader = (show) => {
  showLoaderContainer(true);
  document.getElementById('loader_img').style.display = !show ? 'none' : '';
}

const showPointer = (show) => {
  document.getElementById('pointer').style.display = !show ? 'none' : '';
}

// Setup Cesium viewer first.
const viewer = new Cesium.Viewer('cesiumContainer', { baseLayerPicker: false });

// Remove stock cesium's base layer
viewer.imageryLayers.remove(viewer.imageryLayers.get(0));

// Utilities

const fetchAndParseXML = (url, options) => {
  const {queryParameters, ...restOptions} = options;
  let queryParams= url.indexOf('?') > -1 ? '&' : '?';
  if(queryParameters){
    queryParams += new URLSearchParams(queryParameters);
  }
  return fetch(url + queryParams, restOptions)
        .then(res => res.text())
        .then(str => new DOMParser().parseFromString(str, 'text/xml'));
}

const constructAndApply3DModel = () => {
  showLoader(true);
  showPointer(false);

  /*********************************************************************************/
  /*  STEP 1: Build 3D CSW XML query based on `mc:classification` profile field,   */
  /*          and fetch XML record using GetRecords CSW operation.                 */
  /*********************************************************************************/  
  const getRecordsXML3D = `<?xml version="1.0" encoding="UTF-8"?>
  <csw:GetRecords
    outputFormat="application/xml"
    outputSchema="http://schema.mapcolonies.com/3d"
    resultType="results"
    service="CSW"
    version="2.0.2"
    startPosition="1"
    maxRecords="200"
    xmlns:mc="http://schema.mapcolonies.com/3d"
    xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
    xmlns:ogc="http://www.opengis.net/ogc">
        <csw:Query typeNames="csw:Record">
            <csw:ElementSetName>full</csw:ElementSetName>
            <csw:Constraint version="1.1.0">
                <ogc:Filter>
                    <ogc:PropertyIsEqualTo>
                        <ogc:PropertyName>mc:classification</ogc:PropertyName>
                        <ogc:Literal>5</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                </ogc:Filter>
            </csw:Constraint>
        </csw:Query>
    </csw:GetRecords>`;

  fetchAndParseXML(CSW_3D_SERVICE_URL,{
    method: 'POST',
    body: getRecordsXML3D,
    /* Don't forget to include the authentication header */
    ...getAuthObject()
  })
  .then(xmlDoc => {
    const modelMetadata = xmlDoc.children[0].children[1].children[0];

  /*********************************************************************************/
  /*  STEP 2: Extract layer's URI from the XML response (<mc:links> element).      */
  /*********************************************************************************/  
    const layerUri = modelMetadata.getElementsByTagName('mc:links')[0].textContent;
   
  /*********************************************************************************/
  /*  STEP 3: Add the layer to cesium's viewer to display it.                      */
  /*          (Using the layerUri variable we just assigned)                       */
  /*********************************************************************************/
    const tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url:new Cesium.Resource({
          url: layerUri,     
          ...getAuthObject()
        })
      })
    );

    viewer.flyTo(tileset)
    .then(function(result){
      if(result) {
        viewer.selectedEntity = tileset;
      }
    })
    .catch(e => console.log(e));
    
  })
  .catch(e => {
    console.error("There was an error fetching the model.. Error: ", e);
  })
  .finally(() => {
    showLoaderContainer(false);
  })
}

show3DModelBtn.addEventListener('click', constructAndApply3DModel);