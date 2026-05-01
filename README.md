# thyme
Convert string datetimes into Dates

There are two variants, with identical APIs.

The regular import allows more date formats. Importing via `/strict` allows
only two formats.

## API

### convert (string) => _Date_|_any_

The default export

If the arg is a valid string, convert it into a JS Date object.
Otherwise just return the arg as given

### jsonParse (str) => _Object_

A named export as a drop-in for `JSON.parse` which converts date-like
strings into `Date` objects

### jsonReviver (key, value) => _Date_|_any_

A named export for use as a `JSON.parse` reviver to convert strings to dates

## Accepted formats

Format | Strict?
--- | ---
_YYYY_**-**_MM_**-**_DD_**T**_HH_**:**_MM_**:**_SS_**Z** | Yes
_YYYY_**-**_MM_**-**_DD_**T**_HH_**:**_MM_**:**_SS.sss_**Z** | Yes
_YYYY_**-**_MM_**-**_DD_ _HH_**:**_MM_**:**_SS_**Z** | No
_YYYY_**-**_MM_**-**_DD_ _HH_**:**_MM_**:**_SS.sss_**Z** | No
_YYYY_**-**_MM_**-**_DD_**T**_HH_**:**_MM_**:**_SS_ | No
_YYYY_**-**_MM_**-**_DD_**T**_HH_**:**_MM_**:**_SS.sss_ | No
_YYYY_**-**_MM_**-**_DD_ _HH_**:**_MM_**:**_SS_ | No
_YYYY_**-**_MM_**-**_DD_ _HH_**:**_MM_**:**_SS.sss_ | No

All datetimes are assumed to be UTC whether there is a `Z` or not.
