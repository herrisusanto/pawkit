const { Amplify } = require("aws-amplify");
const { generateClient } = require("aws-amplify/api");
const { signIn, confirmSignIn, fetchAuthSession } = require("aws-amplify/auth");
const fs = require("fs");
const amplifyConfig = require("./amplifyconfiguration.json");

Amplify.configure(amplifyConfig);

// Get the filename from command-line arguments
const filename = process.argv[2];

if (!filename) {
  console.error("Usage: node read-file.js <filename>");
  process.exit(1);
}

// Read the file asynchronously
fs.readFile(filename, "utf8", async (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
  } else {
    try {
      await signIn({
        username: "+6597768878",
        options: { authFlowType: "CUSTOM_WITHOUT_SRP" },
      });

      await confirmSignIn({ challengeResponse: "123456" });

      console.log((await fetchAuthSession()).tokens.accessToken.toString());

      if (filename.includes("breeds.csv")) {
        importBreeds(csvToJson(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
});

const importBreeds = async (breedsData) => {
  const graphqlClient = generateClient();

  const createBreedMutation = `
       mutation CreateBreed($input: CreateBreedInput = {name: "empty", petType: DOG, undercoatRemoval: false}) {
         createBreed(input: $input) {
           name
         }
       }
      `;

  const deleteBreedMutation = `
       mutation DeleteBreed($input: DeleteBreedInput = {name: "empty"}) {
         deleteBreed(input: $input) {
           name
         }
       }
      `;

  const deleteBreedsMutations = breedsData.map((data) => {
    return graphqlClient.graphql({
      query: deleteBreedMutation,
      variables: {
        input: {
          name: data["name"],
        },
      },
    });
  });

  await Promise.all(deleteBreedsMutations);
  console.log("deleted all breeds");

  const createBreedsMutations = breedsData.map((data) => {
    const formattedData = {
      ...data,
      undercoatRemoval: data["undercoatRemoval"] === "TRUE",
      basicGroomingDuration: Number(data["basicGroomingDuration"]),
      fullGroomingDuration: Number(data["fullGroomingDuration"]),
      coats: String(data["coats"])
        .trim()
        .split("/")
        .map((coat) => coat.trim().toUpperCase()),
    };
    return graphqlClient.graphql({
      query: createBreedMutation,
      variables: {
        input: formattedData,
      },
    });
  });

  const results = await Promise.all(createBreedsMutations);
  console.log("created breeds successfully.");
  console.log(`Total breeds created: ${results.length}`);
};

const csvToJson = (csv) => {
  // Split the CSV into an array of rows
  const rows = csv.trim().split("\r\n");

  // Get the headers from the first row
  const headers = rows[1].split(",");

  // Initialize an array to store the JSON objects
  const jsonData = [];

  // Iterate over each row starting from the second row (index 1)
  for (let i = 2; i < rows.length; i++) {
    // Split the current row into an array of values
    const values = rows[i].split(",");

    // Initialize an object to store the current row's data
    const rowObject = {};

    // Iterate over each value and map it to the corresponding header
    for (let j = 0; j < headers.length; j++) {
      rowObject[headers[j]] =
        typeof values[j] === "string"
          ? String(values[j]).replaceAll('"', "")
          : values[j];
    }

    // Push the row object to the JSON data array
    jsonData.push(rowObject);
  }

  // Return the JSON data
  return jsonData;
};
