import os
from unittest import TestCase
from test.test_helper import testdir

from lib.files.csv_file import CsvFile
from lib.files.tsv_file import TsvFile
from lib.files.text_file import TextFile


class TestFiles(TestCase):
    def setUp(self):
        self.text_filename = os.path.join(testdir(), "fixtures", "about.txt")
        self.csv_filename = os.path.join(testdir(), "fixtures", "scores.csv")
        self.tsv_filename = os.path.join(testdir(), "fixtures", "scores.tsv")

    def test_text_file_read(self):
        with open(self.text_filename, "r") as fd:
            expected_content = fd.read()

        text_file = TextFile(self.text_filename)
        self.assertEqual(expected_content, text_file.read())
    
    def test_csv_file_read_first_two_lines(self):
        with open(self.csv_filename, "r") as fd:
            expected_lines = fd.readlines()[:2]

        csv_file = CsvFile(self.csv_filename)
        self.assertCountEqual(expected_lines, csv_file.read_first_two_lines())

    def test_tsv_file_read_last_two_lines(self):
        with open(self.tsv_filename, "r") as fd:
            expected_lines = fd.readlines()[-2:]

        tsv_file = TsvFile(self.tsv_filename)
        self.assertCountEqual(expected_lines, tsv_file.read_last_two_lines())
