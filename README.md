# Gull New Component

## Default Imports

```json
  {
    "label": "React",
    "description": "import React from 'react';",
    "picked": true,
  },
  {
    "label": "Styled Components",
    "description": "import styled from 'styled-components';",
    "picked": true,
  },
  {
    "label": "Prop Types",
    "description": "import PropTypes from 'prop-types';",
  },
  {
    "label": "Axios",
    "description": "import axios from 'axios';",
  }
```
## Config File

Allows you to specify additional imports on a per project basis.

The filename must be `gullconfig.js` and placed in the project root.


| Property | Description|
|-------------|---|
| label       | The import name.
| description | The import syntax as needed.
| picked      | Whether or not the import should be preselected in the GullComponent extension dropdown.


Example config:

```json
{
  "imports": [
    {
      "label": "Object Path",
      "description": "import objectPath from 'object-path';",
      "picked": true
    },
    {
      "label": "Styled Components",
      "description": "import styled, { css } from 'styled-components';",
      "picked": true
    },
    {
      "label": "DateFns",
      "description": "import { format } from 'date-fns';",
    }
  ]
}
```

Specifying an import with a label that exists as a default will override that default.

See `Styled Components` in the output below when selecting `Styled Components` from the GullComponent extension dropdown with the above config in place.

```javascript
import React from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { format } from 'date-fns';

const MyComponent = (props) => (

);

export default MyComponent

```
