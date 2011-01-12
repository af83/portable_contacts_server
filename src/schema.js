/* Schema of application data, used by rest-mongo to generate objects */

exports.schema = {
  User: {
    schema: {
      id: "User",
      description: "A human resource owner.",
      type: "object",

      properties: {
        id: {type: "string"},
        displayname: {type: "string"},
        emails: {type: "object"},
        accounts: {type: "object"}
      }
    },
    methods: {
      
    }
  }
};
