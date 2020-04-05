from ..interfaces.file_interface import FileInterface


class CsvFile(FileInterface):
    def read(self):
        return super().read()
    
    def read_first_two_lines(self):
        return super().read_first_two_lines()
    
    def read_last_two_lines(self):
        return super().read_last_two_lines()
