# Portable contact server

Simple proof of concept of http://portablecontacts.net/draft-spec.html.

Use it with:

* node
* mongodb
* rest-mongo

Implements only some parts of **filtering** section, without **sorting**. 

## Install

    $> git submodule update --init --recursive
    $> node src/scripts/load_data.js examples/fake.json
    $> node src/server.js


## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see [http://www.fsf.org/licensing/licenses/agpl-3.0.html](http://www.fsf.org/licensing/licenses/agpl-3.0.html).
