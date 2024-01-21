conan export external/snappy snappy/1.1.9@
mkdir .build 
cd .build
conan install .. --output-folder . --build missing --settings build_type=Release
cmake -DCMAKE_TOOLCHAIN_FILE:FILEPATH=/build/generators/conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build .
