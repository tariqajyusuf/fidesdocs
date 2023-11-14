import dynamic from 'next/dynamic';
import { useEffect,  useState } from 'react';
import "swagger-ui-react/swagger-ui.css"

export default function Swagger({ filterStrings, ...props}) {
    const [apiDocs, setApiDocs] = useState(null);
    const SwaggerUI = dynamic(import('swagger-ui-react'), {ssr: false})
    const baseUrl = 'https://ethyca.github.io/fides/stable/';

    // hack to hide the Authorize button to prevent confusion
    const DisableAuthorizePlugin = function() {
        return {
            wrapComponents: {
                authorizeBtn: () => () => null,
            },
        };
    };

    // finds redirect to page in body
    useEffect(() => {
        const getDocs = async () => {

            const res = await fetch(baseUrl);
            const pageHtml = await res.text();
      
            // Parse the HTML string
            const parser = new DOMParser();
            const doc = parser.parseFromString(pageHtml, 'text/html');
      
            // Query the parsed HTML for the meta tag
            const noscript = doc.querySelector('noscript');
            if (noscript) {
              const meta = noscript.querySelector('meta');
              if (meta) {
                const content = meta.getAttribute('content');
                if (content) {
                  const url = content.split('url=')[1];  // get the part after 'url='
                  const version = url.split('/')[1]; // get the part after the first '/'
                  
                  if (version) {
                    const docsUrl = `https://ethyca.github.io/fides/${version}/api/openapi.json`;
                    console.log(`Loading Docs from Fides Open Source: ${version}`)

                    const docsRes = await fetch(docsUrl);
                    const docsJson = await docsRes.json();

                    // Logic below explained
                    // 1. The .filter() method first filters out the API paths from the OpenAPI spec that are included in the filterStrings array passed as a prop. The filtered paths are saved in the filteredPaths array.
                    // 2. For each of the filtered paths, we then iterate over the filterStrings array. For each filter object, we check if the current path starts with the path specified in the filter object.                    
                    // 3. If it does, we create a new object filteredMethods. This object will hold all the methods for this path that match the method specified in the filter object. We populate filteredMethods by iterating over all methods in obj[path] and including those that match the method specified in the filter object.
                    // 4. Once we've checked all methods for the current path, we check if filteredMethods is empty. If it is, it means none of the methods for this path matched the method specified in the filter object, so we don't want to include this path in the final OpenAPI spec.
                    // 5. If filteredMethods is not empty, we replace obj[path] with filteredMethods. This means that for this path, we only include the methods that were specified in the filter object.
                    // 6. The updated object obj is then returned by the .reduce() method. The keys of this object are the paths included in the final OpenAPI spec, and the values are the methods for each path.
                    // 7. Finally, we replace docsJson.paths with filteredPaths, which is the object holding the filtered paths and methods.
                    if (filterStrings && Array.isArray(filterStrings)) {
                        const filteredPaths = Object.keys(docsJson.paths)
                            .filter(path => filterStrings.some(filterObj => (filterObj.greedy ? path.startsWith(filterObj.path) : path == (filterObj.path))))
                            .reduce((obj, path) => {
                                obj[path] = docsJson.paths[path];
                    
                                // If methods are specified, filter out the methods
                                filterStrings.forEach(filterObj => {
                                    if (path.startsWith(filterObj.path) && filterObj.method) {
                                        let filteredMethods = {};
                                        Object.keys(obj[path])
                                            .filter(method => method.toLowerCase() === filterObj.method.toLowerCase())
                                            .forEach(method => {
                                                filteredMethods[method] = obj[path][method];
                                            });
                    
                                        // If no methods are left after the filtering, don't include this path
                                        if (Object.keys(filteredMethods).length > 0) {
                                            obj[path] = filteredMethods;
                                        }
                                    }
                                });
                    
                                return obj;
                            }, {});
                    
                        docsJson.paths = filteredPaths;
                    }

                    // Remove security definitions, components, servers, and schemes to prevent awkward bar rendering at top
                    if(docsJson.components) {
                        delete docsJson.components.securitySchemes;
                    }

                    if(docsJson.securityDefinitions) {
                        delete docsJson.securityDefinitions;
                    }

                    // Remove all the original servers
                    if(docsJson.servers) {
                        delete docsJson.servers;
                    }

                    // Remove all the original schemes
                    if(docsJson.schemes) {
                        delete docsJson.schemes;
                    }

                    setApiDocs(docsJson); // Set the modified spec as the docsUrl state
                  }
                }
              }
            }
        }

        getDocs();
    }, [])
 
    return (
        <>
          {apiDocs ? (
              <div style={{ border: "1px solid #e5e7eb", borderRadius: "0.5rem" }}>
                <SwaggerUI spec={apiDocs} supportedSubmitMethods={[]} plugins={[DisableAuthorizePlugin]} {...props} />
              </div>
            ) : <h4>Loading latest documentation...</h4>
          }
        </>
    )
    
}
