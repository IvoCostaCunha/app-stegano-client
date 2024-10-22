# stegano-image (React front)
## Sign all your creations !

**!!! I'm in the process of modifing this project to be able to run on localhost & deployed on a host, sorry for the inconvenience, will do asap !!!**

stegano-image (I will find a better name later eventualy), is a wep app that allows it's users to sign their images and creations using steganographic techniques.
It uses the LSB technique (Least Significant Bit) is order to provide a signature in a PNG file while deterioring it the least possible.

## Features
- Import all your creations to your account and store them.
- Sign your creations.
- Download you signed creations.

## Technologies used
This app uses a number of open source projects to work properly:

- [React](https://fr.legacy.reactjs.org/) - Used for the front end due to it's speed.
- [Python](https://www.python.org/) - Used to manipulate images in the backend API.
- [Flask](https://flask.palletsprojects.com/en/2.3.x/) - Framework used for the backend Python API.
- [PostgreSQL](https://www.postgresql.org/) - The used database to manage user accounts.
- [Bucketeer](https://bucketeer.io/) - Allows to store images in Amazon AWS.

## Installation

### Requirements
- [Node.js](https://nodejs.org/) (Tested in Node.js@16+)
- [Python](https://www.python.org/) (Tested in Python@3.11.4)

**These 2 must be installed before the next steps.**

##### Create a suitable directory

**This project has a frontend and a backend so it's dependent on 2 repositories and once set up 2 servers at minimum.**

#### On Windows & Mac & Linux
```sh
mkdir stegano-image-project && cd stegano-image-project
git clone git@github.com:IvoCostaCunha/stegano-image.git
git clone git@github.com:IvoCostaCunha/stegano-image-api.git
```
**Start the backend first**

### API

How to install the dependencies first then start the backend.

#### On Windows
```sh
cd app-stegano-api
python -m venv .venv
.venv\Scripts\activate
# using python virtual environment
pip install -r requirements.txt
flask run
```

#### On Mac
```sh
cd app-stegano-api
python -m venv .venv
source .venv/bin/activate
# using python virtual environment
pip install -r requirements.txt

# if this fails at psycopg2
# if you don't have brew installed install it otherwise skip this step
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install postgresql

flask -run
```

#### On Debian based Linux
```sh
cd app-stegano-api
python -m venv .venv
source .venv/bin/activate
# using python virtual environment
pip install -r requirements.txt
sudo apt install postgresql
flask -run
```

#### On Arch based Linux
```sh
cd app-stegano-api
python -m venv .venv
source .venv/bin/activate
# using python virtual environment
pip install -r requirements.txt
sudo pacman -S postgresql
flask -run
```

On other distributions do the same with your favorite packet manager.

### Frontend

**Open a new terminal window and cd into stegano-image-project**

### Install the dependencies and start the frontend.
```sh
cd stegano-image/app-stegano-image
npm install
npm start
```
## Note
This project was one of my last projects during my Master and so while it's functionnal it's not complete. I may complete it or not.
