import os
from tempfile import NamedTemporaryFile
from lib.files.text_file import TextFile
from lib.spreadsheets.csv_spreadsheet import CsvSpreadsheet

# Create a temporary text file for testing
with NamedTemporaryFile(mode="w", delete=False) as fd:
    fd.write("Hello there, this is the first line\n")
    fd.write("Hello there, this is the second line\n")
    fd.write("Hello there, this is the third line\n")
    fd.write("Hello there, this is the fourth line\n")
    fd.write("Hello there, this is the fifth line\n")
text_filename = fd.name

# Create a temporary csv file for testing
with NamedTemporaryFile(mode="w", delete=False) as fd:
    fd.write("name,age\n")
    fd.write("Aka Abdulfatai,67\n")
    fd.write("Tolu Aina,70\n")
    fd.write("Bighead You,10\n")
csv_filename = fd.name

# Create a temporary tsv file for testing
with NamedTemporaryFile(mode="w", delete=False) as fd:
    fd.write("name\tage\n")
    fd.write("Aka Abdulfatai\t67\n")
    fd.write("Tolu Aina\t70\n")
    fd.write("Bighead You\t10\n")
tsv_filename = fd.name

csv_file = TextFile(csv_filename)
print(csv_file.read()); print("\n")
print(csv_file.read_first_two_lines()); print("\n")
print(csv_file.read_last_two_lines()); print("\n")

csv_spreadsheet = CsvSpreadsheet(csv_filename)

for row in csv_spreadsheet.fetch_first_two_rows():
    print(row)
    print("\n")

for row in csv_spreadsheet.fetch_last_two_rows():
    print(row)
    print("\n")


os.remove(csv_filename)
os.remove(tsv_filename)
os.remove(text_filename)