import { gql, useMutation, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { Button, Columns, Form, Heading } from "react-bulma-components";

const QUERY_NOTES = gql`
  query GET_NOTES {
    notes {
      id
      message
    }
  }
`;

const QUERY_MUTATION = gql`
  mutation CREATE_NOTE($message: String!) {
    createNote(message: $message) {
      id
      message
    }
  }
`;

/** Get notes from the database
 * @param data 
 * @returns 
 */
function mapToDataNotes(data: any): Array<any> {

  if (data && Array.isArray(data.notesFromEF)) {
    return data.notesFromEF;
  }
  
  return [];
}

export default function Notes() {

  const [note, setNote] = useState<string>("");
  const { loading, data, refetch } = useQuery(QUERY_NOTES);
  const [createNote, {loading: loadingAdd }] = useMutation(QUERY_MUTATION);
  const getDataList = useMemo(() => mapToDataNotes(data), [data]);

  /** Create a note
   */
  const addNote = async () => {

    if (!!note) {

      await createNote({
        variables: {
          message: note
        }
      });

      setNote("");
      await refetch();

    } else console.log("ERROR");
  };

  return (
    <>
      <Columns>
        <Columns.Column>
          <Form.Field>
            <Form.Label>Note</Form.Label>
            <Form.Control>
              <Form.Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Control>
          </Form.Field>
          <div className="buttons">
            <Button
              color="success"
              fullwidth
              loading={loading || loadingAdd}
              onClick={addNote}
            >
              Add New Note
            </Button>
            <Button
              color="dark"
              fullwidth
              loading={loading || loadingAdd}
              onClick={async () => { await refetch(); }}
            >
              Refresh Data
            </Button>
          </div>
        </Columns.Column>
        <Columns.Column>
          <Heading>Note List</Heading>
          <div className="content">
            <ul>
              {getDataList.map((note) => <li key={note.id}>{note.message}</li>)}
            </ul>
          </div>
        </Columns.Column>
      </Columns>
    </>
  );
}
