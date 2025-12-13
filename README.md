# thyme
Convert string datetimes into Dates

## convert (string) => Date

The default export

If the arg is a valid string, convert it into a JS Date object.
Otherwise just return the arg as given

Valid string formats are:
-   A date in the form YYYY-MM-DD
-   either `T` or `{space}`
-   A valid time: HH:MM:SS or HH:MM:SS.sss
-   An optional trailing `Z`

All datetimes are assumed to be UTC whether there is a `Z` or not.

## jsonParse (str) => Object

A named export as a drop-in for `JSON.parse` which converts date-like
strings into `Date` objects
