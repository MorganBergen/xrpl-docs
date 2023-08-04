# executable process
# chmod +x reset_conan.sh
# ./reset_conan.sh
conan profile new default --detect
conan profile update settings.compiler.cppstd=20 default
conan profile update env.CC=/usr/bin/gcc default
conan profile update env.CFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1 default
conan profile update env.CXX=/usr/bin/g++ default
conan profile update env.CXXFLAGS=-DBOOST_ASIO_HAS_STD_INVOKE_RESULT=1 default
conan profile update 'conf.tools.build:compiler_executables={"c": "/usr/bin/gcc"}' default
conan profile update options.boost:extra_b2_flags="define=BOOST_ASIO_HAS_STD_INVOKE_RESULT" default
