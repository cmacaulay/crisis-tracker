# README

This was done as a personal student project for BE-M3 @Turing.io. 

The idea behind the project was to have a visual representation of where humanitarian crises were happening, how long they tend to affect populations for, and to pinpoint the most affected areas. Future iterations will add a filter to the map, and visualize aid flow to see if the two datasets correlate as strongly as one might think. 

Crisis Tracker maps out data pulled from the [API Docs](https://www.humanitarianresponse.info/en/about/hrinfo-api-documentation, "Humanitarian Response Data API"). All humanitarian disasters with current response operations have a marker on the map. Markers with shadows have more than one operation pertaining to different disasters in the area. 

# How To:
Please visit the final product here: [Heroku](https://crisis-tracker.herokuapp.com)

To run the app locally: 

App Setup:
```
git clone https://github.com/cmacaulay/crisis-tracker.git
cd crisis-tracker/
bundle install
rails s
navigate to localhost
```
