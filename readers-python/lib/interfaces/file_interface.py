from abc import ABC, abstractmethod


class FileInterface(ABC):
    def __init__(self, filename):
        self.fd = None
        self.filename = filename

    @abstractmethod
    def read(self):
        # define default implementation
        with self as fd:
            return fd.read()
        # Check if it closes afterwards

    @abstractmethod
    def read_first_two_lines(self):
        # define default implementation
        result = []
        for line in self:
            result.append(line)
            if len(result) >= 2:
                self._destory_descriptor()
                break
        return result

    def read_last_two_lines(self):
        # define default implementation
        index = 0
        result = [None, None]
        for line in self:
            result[index] = line
            index = (index + 1) % 2
        result = [item for item in result if item]
        result.reverse()
        return result

    def _create_descriptor(self):
        self._destory_descriptor()
        self.fd = open(self.filename, "r")

    def _destory_descriptor(self):
        if self.fd and not self.fd.closed:
            self.fd.close()
        self.fd = None

    def __iter__(self):
        self._create_descriptor()
        return self
    
    def __next__(self):
        line = self.fd.readline()
        if not line:
            self._destory_descriptor()
            raise StopIteration
        return line

    def __enter__(self):
        self._create_descriptor()
        return self.fd

    def __exit__(self, *exc):
        self._destory_descriptor()
