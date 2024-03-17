# Historical Weather

The website, hosted at https://historicalweather.sn1316.com allows you to give a specific location and to find out the weather conditions on any given date, for the previous 20 years.

## How it works

When you enter a location, it is passed to the GeoCodes.org API which returns the most likely match (it chooses the place with the highest population where the name matches the entered place name.)

A list of dates for the past 20 years is assembled (taking into account leap years, where it will simply use March 1st when neccessary).

The site then makes a series of requests to the Open-Meteo.com Historical Weather API for the respective latitude/longitude, and respective dates.

The results are then displayed in a table, which shows:

- Year
- Maximum Temperature
- Minimum Temperature
- Prevailing Wind Direction
- Maximum Wind Speed (in km/h)
- Precipitation (in millimeters)
- Weather Condition

## Further Development Plans

It is planned to add graphical visualizations of the data in addition to the table.
