# Smart Flanders
*Convincing cities to publish their data as Linked Open Data*

Team Smart Flanders is working on a new way for cities to publish data about the accessibility of public buildings. 
Using a form, the city can describe several aspects of an address: opening hours, type of public building and accessibility. Afterwards, the data gatherer transforms this to linked open data. They are doing this for two reasons: to make the data published by the cities linked open data and machine-readable and to provide the data that makes public buildings more accessible for everyone. This project is linked to project AccessFlanders.

## Parts of the project
The Smart Flanders project consists of 2 parts:
- [Linked Open Data generator](http://smartflanders.ilabt.imec.be)
- [Our blog](https://osoc18.github.io/SmartFlanders-blog) with it’s own [repository](https://www.github.com/oSoc18/SmartFlanders-blog)

## Front end

Here you can find the wireframes for the homepage, overviewpage, detailpage and the page to add a new service. Due some technical requirements, the searchbar on the homepage is replaced by multiple search fields for the actual implementation. For the detailpage were multiple possible wireframes drawn but eventually the second one is implemented.

- Homepage
- Overviewpage with found buildings
- Detailpage with information about building
- Add service page

Front endThe development of the front end has been a rollercoaster. We went from vanilla JavaScript and Pug templates to our final result as a React application with Redux. React makes it easy to create interactive UIs and design simple views for each state in the application. React is component-based which means that the build encapsulates components that manage their own state.  Since component logic is written in JavaScript instead of templates, it is easily to pass data through the application. 

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
