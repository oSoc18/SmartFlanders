# Smart Flanders
*Convincing cities to publish their data as Linked Open Data*

## Back end

The back end is based on a NodeJS application with a NGINX in front of it as a reverse proxy.
The back end operates as a simple file server that collects the snippets from the front end and publish it as Linked Open Data on the /graph resource.
API

The back end (as described above) is the same as the API:

- **/graph**:
Gives you access to the master catalogue of all the cities. By following the links in the catalogue you can get all the buildings for a city and the accessibility data for each city.

- **/graph/{postcode}/catalog.json**:
Gives you access to the catalogue of the city. Every entry is a building of the city, if you follow the link to the building you can read the building’s accessibility information, address, ...

- **/graph/{postcode}/{buildingId}.json**:
A JSON-LD file with all the data we publish about a building.
  - Address ID of the building registry.
  - Building ID of the building registry.
  - Image and name of the building, if ToeVla data is available.
  - Width of the entrance and elevators, if ToeVla data is available
  - The ToeVla schematic, if ToeVla data is available.
Not all the buildings are available in the ToeVla data, that’s the reason why some buildings will have less information than others.

- **/gebouwen**:
Returns a list of buildings based on the address.

- **/gebouwunits**:
Returns a list of building units of a building.

- **/snippet**:
Generates a JSON-LD snippet for a certain build.

- **/services**:
Adds a service to the graph, linked to a building.

- **/schema.json**:
Serves the `schema.org` JSON-LD context from our server to speed up the AccessFlanders application.

## Front end
