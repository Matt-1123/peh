import React, { useState, useEffect } from "react";
// import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { uploadData, getUrl, remove } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/api";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

const client = generateClient();

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  // This function uses the API class to send a query to the GraphQL API and retrieve a list of notes.
  async function fetchNotes() {
    const apiData = await client.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          // const url = await Storage.get(note.name);
          // ^ v6 of amplify-cli uses new methods below
          const url = await getUrl({ key: note.id });
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    const result = await client.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    if (!!data.image)
      await uploadData({ key: result.data.createNote.id, data: image }).result;
    fetchNotes();
    event.target.reset();
  }

  // This function also uses the API class to send a mutation to the GraphQL API. The main difference is that in this function we are passing in the variables needed for a GraphQL mutation so that we can create a new note with the form data.
  // async function createNote(event) {
  //   event.preventDefault();
  //   const form = new FormData(event.target);
  //   const image = form.get("Image");
  //   const data = {
  //     name: form.get("name"),
  //     description: form.get("description"),
  //     image: image.name,
  //   };

  //   const result = await uploadData({
  //     key: data.name,
  //     data: image,
  //     options: {
  //       onProgress: ({ transferredBytes, totalBytes }) => {
  //         if (totalBytes) {
  //           console.log(
  //             `Upload progress ${
  //               Math.round(transferredBytes / totalBytes) * 100
  //             } %`
  //           );
  //         }
  //       },
  //     },
  //   }).result;
  //   console.log("Succeeded: ", result);

  // if (!!data.image) await Storage.put(data.name, image);
  // ^ deprecated v5 amplify-cli
  // try {
  //   const result = await uploadData({
  //     key: data.name,
  //     data: image,
  //     options: {
  //       onProgress: ({ transferredBytes, totalBytes }) => {
  //         if (totalBytes) {
  //           console.log(
  //             `Upload progress ${
  //               Math.round(transferredBytes / totalBytes) * 100
  //             } %`
  //           );
  //         }
  //       },
  //     },
  //   }).result;
  //   console.log("Succeeded: ", result);
  // } catch (error) {
  //   console.log("Error : ", error);
  // }

  // TODO: add logic to only upload image if one is selected
  // if (!!data.image) {}
  //   await client.graphql({
  //     query: createNoteMutation,
  //     variables: { input: data },
  //   });
  //   fetchNotes();
  //   event.target.reset();
  // }

  // this function is sending a GraphQL mutation along with some variables, but instead of creating a note, we are deleting a note.
  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    // await Storage.remove(name);
    // ^ amplify-cli v6 uses new method below
    await remove({ key: id });
    await client.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            {note.image && (
              <Image
                src={note.image}
                alt={`visual aid for ${notes.name}`}
                style={{ width: 400 }}
              />
            )}
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);

// The withAuthenticator component scaffolds out an entire user authentication flow allowing users to sign up, sign in, reset their password, and confirm sign-in for multifactor authentication (MFA).
