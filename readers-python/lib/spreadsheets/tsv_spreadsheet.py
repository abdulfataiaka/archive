from ..interfaces.spreadsheet_interface import SpreadsheetInterface


class TsvSpreadsheet(SpreadsheetInterface):
    def __init__(self, filename):
        super().__init__(filename, "\t")

    def fetch_first_two_rows(self):
        return super().fetch_first_two_rows()
    
    def fetch_last_two_rows(self):
        return super().fetch_last_two_rows()
