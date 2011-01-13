# Portable contact server

Simple proof of concept of [Portable contacts specification](http://portablecontacts.net/draft-spec.html).

Use it with:

* node
* mongodb
* rest-mongo

## Filtering

We only support **filterOp** with **equals** value. **filterBy** and **filterValue** work fine.

## Sorting

Not implemented.

## Pagination

Not implemented.

## Presentation

Not implemented. Only support json output.

## Install

    $> git submodule update --init --recursive
    $> node src/scripts/load_data.js examples/fake.json
    $> node src/server.js

Nodetk is not vendorized using submodules. Please report to [nodetk](https://github.com/AF83/nodetk) to install it.

## Example

    $> wget "http://localhost:8001/portable_contacts?filterBy=emails.value&filterOp=equals&filterValue=wendy.wellesley%40example.com"

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
