import os
import sys
import pandas

def basedir():
    return os.path.abspath(os.path.join(__file__, "..", ".."))

def testdir():
    return os.path.join(basedir(), "test")

def assertRowsEqual(first_rows_list, second_rows_list):
    for first_row, second_row in zip(first_rows_list, second_rows_list):
        if type(first_row) != pandas.Series or type(first_row) != pandas.Series or not first_row.equals(second_row):
            raise AssertionError("Pandas series not equal")
    return True

# Set load path for test suites
sys.path.append(basedir())
