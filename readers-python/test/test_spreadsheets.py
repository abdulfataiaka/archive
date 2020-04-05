import os
import pandas 
from unittest import TestCase
from test.test_helper import testdir, assertRowsEqual

from lib.spreadsheets.csv_spreadsheet import CsvSpreadsheet
from lib.spreadsheets.tsv_spreadsheet import TsvSpreadsheet


class TestSpreadsheets(TestCase):
    def setUp(self):
        self.csv_filename = os.path.join(testdir(), "fixtures", "scores.csv")
        self.tsv_filename = os.path.join(testdir(), "fixtures", "scores.tsv")

        self.csvdf = pandas.read_csv(self.csv_filename)
        self.tsvdf = pandas.read_csv(self.tsv_filename, sep="\t")

    def test_fetch_first_two_rows(self):
        expected_rows = [self.csvdf.iloc[0], self.csvdf.iloc[1]]
        csv_spreadsheet = CsvSpreadsheet(self.csv_filename)
        assertRowsEqual(expected_rows, csv_spreadsheet.fetch_first_two_rows())

    def test_fetch_last_two_rows(self):
        expected_rows = [self.tsvdf.iloc[-2], self.tsvdf.iloc[-1]]
        tsv_spreadsheet = TsvSpreadsheet(self.tsv_filename)
        assertRowsEqual(expected_rows, tsv_spreadsheet.fetch_last_two_rows())
