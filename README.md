
# Analytics GiW Experiments Report Aggregator v1.2
## Persado SDE team
### 29/08/2019

Revisions
--------

v1.2: Changed li.innerHTML to li.textContent. File input now only accepts specific file types.
    Some layout/css compatibility changes.

v1.1: Sorts downloaded CSV records by date.

v1.0: All files are opened and read, showing a list of them on screen. From the "Summary" sheet,
    it retrieves the SECOND part of the date range (after the "-") and from the "Dataset1" sheet, it
    retrieves all the data. It combines date + data in one row, with the appropriate column names
    and "download csv" downloads an export.csv file with all the data.

*** The Excel files must follow THIS EXACT FORMAT (date format, column and sheet names etc.). If
anything changes and it doesn't work anymore, for any bugs or suggestions, please contact me. ***

* Only tested in Chrome. *
