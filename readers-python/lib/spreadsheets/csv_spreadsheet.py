from ..interfaces.spreadsheet_interface import SpreadsheetInterface


class CsvSpreadsheet(SpreadsheetInterface):
    def __init__(self, filename):
        super().__init__(filename, ",")

    def fetch_first_two_rows(self):
        return super().fetch_first_two_rows()
    
    def fetch_last_two_rows(self):
        return super().fetch_last_two_rows()
