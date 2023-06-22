from conans import ConanFile
from conan.tools.cmake import CMake, CMakeToolchain, cmake_layout
import re

class Xrpl(ConanFile):
    name = 'xrpl'

    license = 'ISC'
    author = 'John Freeman <jfreeman@ripple.com>'
    url = 'https://github.com/xrplf/rippled'
    description = 'The XRP Ledger'
    settings = 'os', 'compiler', 'build_type', 'arch'
    options = {
        'assertions': [True, False],
        'coverage': [True, False],
        'fPIC': [True, False],
        'jemalloc': [True, False],
        'reporting': [True, False],
        'rocksdb': [True, False],
        'shared': [True, False],
        'static': [True, False],
        'tests': [True, False],
        'unity': [True, False],
        'boost_version': ['1.80.0', '1.81.0'],  
        'protobuf_version': ['3.21.4', '3.22.0'],  
        'rocksdb_version': ['6.27.3', '6.28.0'],  
    }

    default_options = {
        'assertions': False,
        'coverage': False,
        'fPIC': True,
        'jemalloc': False,
        'reporting': False,
        'rocksdb': True,
        'shared': False,
        'static': True,
        'tests': True,
        'unity': False,
        'boost_version': '1.80.0',  # Set default boost version
        'protobuf_version': '3.21.4',  # Set default protobuf version
        'rocksdb_version': '6.27.3',  # Set default rocksdb version
        # Rest of the options...
    }

    def set_version(self):
        path = f'{self.recipe_folder}/src/ripple/protocol/impl/BuildInfo.cpp'
        regex = r'versionString\s?=\s?\"(.*)\"'
        with open(path, 'r') as file:
            matches = (re.search(regex, line) for line in file)
            match = next(m for m in matches if m)
            self.version = match.group(1)

    def requirements(self):
        boost_version = self.options.boost_version
        protobuf_version = self.options.protobuf_version
        rocksdb_version = self.options.rocksdb_version

        self.requires(f'boost/{boost_version}')
        self.requires(f'protobuf/{protobuf_version}')
        self.requires(f'rocksdb/{rocksdb_version}')
        # Add other requirements...

    # Rest of the code...

