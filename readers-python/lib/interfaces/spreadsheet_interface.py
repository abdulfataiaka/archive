import pandas
from abc import ABC, abstractmethod


class SpreadsheetInterface(ABC):
    def __init__(self, filename, separator):
        self.filename = filename
        self.separator = separator
        self.dataframe = pandas.read_csv(self.filename, sep=self.separator)
        self.nrows = len(self.dataframe)

    @abstractmethod
    def fetch_first_two_rows(self):
        # define default implementation
        result = []
        for row in self:
            result.append(row)
            if len(result) >= 2:
                break
        return result

    @abstractmethod
    def fetch_last_two_rows(self):
        # define default implementation
        index = 0
        result = [None, None]
        for row in self:
            result[index] = row
            index = (index + 1) % 2
        result = [item for item in result if item is not None]
        result.reverse()
        return result

    def __iter__(self):
        self.current_row_index = 0
        return self

    def __next__(self):
        if self.current_row_index >= self.nrows:
            raise StopIteration

        row = self.dataframe.iloc[self.current_row_index]
        self.current_row_index += 1
        return row
