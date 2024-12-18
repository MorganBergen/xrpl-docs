#  Requirements

##  1.  `xrpl-py` library which is available on PyPI

`xrpl-py` is a pure python implementation for interacting with the xrp ledger.  The `xrpl-py` library simplifies the hardest parts of the xrp ledger interactions, like serialization and transaction signing.  It also provides native python methods and models for xrp ledger transactions and core server api `rippled` objects.

Use the command `pip3 install xrpl-py` to install.  However upon calling this command I recieved the following error.

###  Error Problem

```zsh
> pip3 install xrpl-py
error: externally-managed-enviroment

× This environment is externally managed
╰─> To install Python packages system-wide, try brew install
    xyz, where xyz is the package you are trying to
    install.
    
    If you wish to install a non-brew-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip.
    
    If you wish to install a non-brew packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```

In order to solve this discrepency you need to use [venv](https://docs.python.org/3/library/venv.html).  The `venv` module supports creating lighweight virtual enviroments, each with their own independent set of python packages installed in their `site` directories.  A virtual enviroment is created on top of an existing python installation, known as the virtual enviroment's base python, and may optionally be isolated from the packages in the base enviroemnt, so only those explicitly installed in the virtual enviroment are available.

When used from within a virtual enviroment, common installation tools such as `pip` will install python packages into a virtual enviroment without needed to be told to do so explicitly. 

A virtual environment is, 

-  Used to contain a specific python interpreter and software libraries and binaries which are needed to support a project (library or applicatiojn).  These are by default isolated from software in other virtual enviroments and python interpreters and libraries installed in the operating system.

-  Contained in a directory, conventionally either named `venv` or `.venv` in the project directory, or under a container directory for lots of virtual enviroments, such as `~/.virtualenvs`.

-  Not checked into source control systems such as git.

-  Considered as disposable - it should be simple to delete and recreate it from scratch.  You don't place any project code in the environment.

-  Not considered as movable or copable - you just recreate the same environment in the target location.

###  Error Resolution

Therefore I must create a virtual enviroment, which is done by executing the command `venv`.

`python -m venv /path/to/new/virtual/enviroment`

Running this command creates the target directory (creating any parent directories that don't exist already) and places a `pyenv.cfg` file in the `home` key pointing to the python installation from which the command was run (a common name for the target directory is `.venv`).  It also creates a `bin` subdirectory containing a copy/symlink of the python binary/binaries (as appropriate for the platform or arguments used at enviroment creation time.)  It also creates an initially empty `lib/pythonX.Y/site-packages subdirectory.

###  Steps to Resolution 

1.  `python3 -m venv .venv`
2.  `cd .venv`
3.  `cd bin`
4.  `source active`
5.  `cd .. cd ..`
6.  `python3 -m pip3 install xrpl-py`

```zsh
Collecting xrpl-py
  Downloading xrpl_py-2.6.0-py3-none-any.whl.metadata (17 kB)
Collecting Deprecated<2.0.0,>=1.2.13 (from xrpl-py)
  Downloading Deprecated-1.2.14-py2.py3-none-any.whl.metadata (5.4 kB)
Collecting ECPy<2.0.0,>=1.2.5 (from xrpl-py)
  Downloading ECPy-1.2.5-py3-none-any.whl.metadata (3.5 kB)
Collecting base58<3.0.0,>=2.1.0 (from xrpl-py)
  Downloading base58-2.1.1-py3-none-any.whl.metadata (3.1 kB)
Collecting httpx<0.25.0,>=0.18.1 (from xrpl-py)
  Downloading httpx-0.24.1-py3-none-any.whl.metadata (7.4 kB)
Collecting pycryptodome<4.0.0,>=3.16.0 (from xrpl-py)
  Downloading pycryptodome-3.20.0-cp35-abi3-macosx_10_9_universal2.whl.metadata (3.4 kB)
Collecting types-Deprecated<2.0.0,>=1.2.9 (from xrpl-py)
  Downloading types_Deprecated-1.2.9.20240311-py3-none-any.whl.metadata (1.6 kB)
Collecting typing-extensions<5.0.0,>=4.2.0 (from xrpl-py)
  Downloading typing_extensions-4.12.1-py3-none-any.whl.metadata (3.0 kB)
Collecting websockets<12.0,>=11.0 (from xrpl-py)
  Downloading websockets-11.0.3-py3-none-any.whl.metadata (6.6 kB)
Collecting wrapt<2,>=1.10 (from Deprecated<2.0.0,>=1.2.13->xrpl-py)
  Downloading wrapt-1.16.0-cp312-cp312-macosx_11_0_arm64.whl.metadata (6.6 kB)
Collecting certifi (from httpx<0.25.0,>=0.18.1->xrpl-py)
  Downloading certifi-2024.6.2-py3-none-any.whl.metadata (2.2 kB)
Collecting httpcore<0.18.0,>=0.15.0 (from httpx<0.25.0,>=0.18.1->xrpl-py)
  Downloading httpcore-0.17.3-py3-none-any.whl.metadata (18 kB)
Collecting idna (from httpx<0.25.0,>=0.18.1->xrpl-py)
  Downloading idna-3.7-py3-none-any.whl.metadata (9.9 kB)
Collecting sniffio (from httpx<0.25.0,>=0.18.1->xrpl-py)
  Downloading sniffio-1.3.1-py3-none-any.whl.metadata (3.9 kB)
Collecting h11<0.15,>=0.13 (from httpcore<0.18.0,>=0.15.0->httpx<0.25.0,>=0.18.1->xrpl-py)
  Downloading h11-0.14.0-py3-none-any.whl.metadata (8.2 kB)
Collecting anyio<5.0,>=3.0 (from httpcore<0.18.0,>=0.15.0->httpx<0.25.0,>=0.18.1->xrpl-py)
  Downloading anyio-4.4.0-py3-none-any.whl.metadata (4.6 kB)
Downloading xrpl_py-2.6.0-py3-none-any.whl (246 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 246.7/246.7 kB 2.5 MB/s eta 0:00:00
Downloading base58-2.1.1-py3-none-any.whl (5.6 kB)
Downloading Deprecated-1.2.14-py2.py3-none-any.whl (9.6 kB)
Downloading ECPy-1.2.5-py3-none-any.whl (43 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 43.1/43.1 kB 3.9 MB/s eta 0:00:00
Downloading httpx-0.24.1-py3-none-any.whl (75 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 75.4/75.4 kB 4.2 MB/s eta 0:00:00
Downloading pycryptodome-3.20.0-cp35-abi3-macosx_10_9_universal2.whl (2.4 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2.4/2.4 MB 8.6 MB/s eta 0:00:00
Downloading types_Deprecated-1.2.9.20240311-py3-none-any.whl (3.5 kB)
Downloading typing_extensions-4.12.1-py3-none-any.whl (37 kB)
Downloading websockets-11.0.3-py3-none-any.whl (118 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 118.1/118.1 kB 5.6 MB/s eta 0:00:00
Downloading httpcore-0.17.3-py3-none-any.whl (74 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 74.5/74.5 kB 5.3 MB/s eta 0:00:00
Downloading sniffio-1.3.1-py3-none-any.whl (10 kB)
Downloading wrapt-1.16.0-cp312-cp312-macosx_11_0_arm64.whl (38 kB)
Downloading certifi-2024.6.2-py3-none-any.whl (164 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 164.4/164.4 kB 6.5 MB/s eta 0:00:00
Downloading idna-3.7-py3-none-any.whl (66 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 66.8/66.8 kB 3.4 MB/s eta 0:00:00
Downloading anyio-4.4.0-py3-none-any.whl (86 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 86.8/86.8 kB 3.3 MB/s eta 0:00:00
Downloading h11-0.14.0-py3-none-any.whl (58 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 58.3/58.3 kB 3.0 MB/s eta 0:00:00
Installing collected packages: ECPy, wrapt, websockets, typing-extensions, types-Deprecated, sniffio, pycryptodome, idna, h11, certifi, base58, Deprecated, anyio, httpcore, httpx, xrpl-py
Successfully installed Deprecated-1.2.14 ECPy-1.2.5 anyio-4.4.0 base58-2.1.1 certifi-2024.6.2 h11-0.14.0 httpcore-0.17.3 httpx-0.24.1 idna-3.7 pycryptodome-3.20.0 sniffio-1.3.1 types-Deprecated-1.2.9.20240311 typing-extensions-4.12.1 websockets-11.0.3 wrapt-1.16.0 xrpl-py-2.6.0
```

Now you have the requirement for `xrpl-py`


##  2.  pip3 install --upgrade wxPython requests toml

```zsh
Collecting wxPython
  Downloading wxPython-4.2.1-cp312-cp312-macosx_10_10_universal2.whl.metadata (2.9 kB)
Collecting requests
  Downloading requests-2.32.3-py3-none-any.whl.metadata (4.6 kB)
Collecting toml
  Downloading toml-0.10.2-py2.py3-none-any.whl.metadata (7.1 kB)
Requirement already satisfied: Deprecated<2.0.0,>=1.2.13 in ./.venv/lib/python3.12/site-packages (from xrpl-py) (1.2.14)
Requirement already satisfied: ECPy<2.0.0,>=1.2.5 in ./.venv/lib/python3.12/site-packages (from xrpl-py) (1.2.5)
Requirement already satisfied: base58<3.0.0,>=2.1.0 in ./.venv/lib/python3.12/site-packages (from xrpl-py) (2.1.1)
Requirement already satisfied: httpx<0.25.0,>=0.18.1 in ./.venv/lib/python3.12/site-packages (from xrpl-py) (0.24.1)
Requirement already satisfied: pycryptodome<4.0.0,>=3.16.0 in ./.venv/lib/python3.12/site-packages (from xrpl-py) (3.20.0)
Requirement already satisfied: types-Deprecated<2.0.0,>=1.2.9 in ./.venv/lib/python3.12/site-packages (from xrpl-py) (1.2.9.20240311)
Requirement already satisfied: typing-extensions<5.0.0,>=4.2.0 in ./.venv/lib/python3.12/site-packages (from xrpl-py) (4.12.1)
Requirement already satisfied: websockets<12.0,>=11.0 in ./.venv/lib/python3.12/site-packages (from xrpl-py) (11.0.3)
Collecting pillow (from wxPython)
  Downloading pillow-10.3.0-cp312-cp312-macosx_11_0_arm64.whl.metadata (9.2 kB)
Collecting six (from wxPython)
  Downloading six-1.16.0-py2.py3-none-any.whl.metadata (1.8 kB)
Collecting charset-normalizer<4,>=2 (from requests)
  Downloading charset_normalizer-3.3.2-cp312-cp312-macosx_11_0_arm64.whl.metadata (33 kB)
Requirement already satisfied: idna<4,>=2.5 in ./.venv/lib/python3.12/site-packages (from requests) (3.7)
Collecting urllib3<3,>=1.21.1 (from requests)
  Downloading urllib3-2.2.1-py3-none-any.whl.metadata (6.4 kB)
Requirement already satisfied: certifi>=2017.4.17 in ./.venv/lib/python3.12/site-packages (from requests) (2024.6.2)
Requirement already satisfied: wrapt<2,>=1.10 in ./.venv/lib/python3.12/site-packages (from Deprecated<2.0.0,>=1.2.13->xrpl-py) (1.16.0)
Requirement already satisfied: httpcore<0.18.0,>=0.15.0 in ./.venv/lib/python3.12/site-packages (from httpx<0.25.0,>=0.18.1->xrpl-py) (0.17.3)
Requirement already satisfied: sniffio in ./.venv/lib/python3.12/site-packages (from httpx<0.25.0,>=0.18.1->xrpl-py) (1.3.1)
Requirement already satisfied: h11<0.15,>=0.13 in ./.venv/lib/python3.12/site-packages (from httpcore<0.18.0,>=0.15.0->httpx<0.25.0,>=0.18.1->xrpl-py) (0.14.0)
Requirement already satisfied: anyio<5.0,>=3.0 in ./.venv/lib/python3.12/site-packages (from httpcore<0.18.0,>=0.15.0->httpx<0.25.0,>=0.18.1->xrpl-py) (4.4.0)
Downloading wxPython-4.2.1-cp312-cp312-macosx_10_10_universal2.whl (31.5 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 31.5/31.5 MB 11.3 MB/s eta 0:00:00
Downloading requests-2.32.3-py3-none-any.whl (64 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 64.9/64.9 kB 4.0 MB/s eta 0:00:00
Downloading toml-0.10.2-py2.py3-none-any.whl (16 kB)
Downloading charset_normalizer-3.3.2-cp312-cp312-macosx_11_0_arm64.whl (119 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 119.4/119.4 kB 5.9 MB/s eta 0:00:00
Downloading urllib3-2.2.1-py3-none-any.whl (121 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 121.1/121.1 kB 6.5 MB/s eta 0:00:00
Downloading pillow-10.3.0-cp312-cp312-macosx_11_0_arm64.whl (3.4 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.4/3.4 MB 12.7 MB/s eta 0:00:00
Downloading six-1.16.0-py2.py3-none-any.whl (11 kB)
Installing collected packages: urllib3, toml, six, pillow, charset-normalizer, wxPython, requests
Successfully installed charset-normalizer-3.3.2 pillow-10.3.0 requests-2.32.3 six-1.16.0 toml-0.10.2 urllib3-2.2.1 wxPython-4.2.1
```