#Smart Flanders userstory

## Problem
* Willem is in a weelchair and wants to pick up his new ID-card at the cityhall
* only 15% of the centercities published their accessibility data on ToeVla

## How does it go right now
Willem has to check several differnt sites to get his information
* the openinghours of the cityhall
* the accessibility of the cityhall
* how will he get to the cityhall
* ...

all of this data:
* has no structure
* is published in many different formats
* isn't up to date
* is difficult to re-use
* maintenance takes a lot of efford

## Solution
### History of data
1. CSV files
2. SPARQL
3. Linked Open Data

### Advantages of Linked Open Data
* uniform format
* link data to eachother without having to publish it again
* adjustments of data only have to be done in one place, *publish once, deploy everywhere*
* it is extendable, it is easy to link extra info like historic info, toeristinfo, ...

## Our goals
### Form
* build a form where cities can fill in the information
* form returns a snippet, which can be used in their website so the information will be picked up by Google

### Datacatalog
* make a datacatalog of the cityhalls of all the centercities
* use the datacatalog to visualise how the links work and how you can follow the links through the data

### Blog
* write blogposts about which problems we had during the process and which problems the cities have with data

### Data for OASIS
* mapping data about the cityhalls and their accessibility for weelchairusers
* this data will be used in the application of the OASIS team
