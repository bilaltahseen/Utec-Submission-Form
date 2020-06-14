import React from 'react';
import { makeStyles, Container, Grid } from '@material-ui/core';
import { app } from '../Firebase/Firebase';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const SuperUser = () => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const getData = () => {
    app
      .firestore()
      .collection('albums')
      .get()
      .then((snapshot) => {
        let docs = [];
        snapshot.forEach((document) => {
          docs.push(document.data());
        });
        setData(docs);
      });
  };
  React.useEffect(getData, []);
  return (
    <React.Fragment>
      <Container maxWidth='md'>
        <Grid container justify='center' alignItems='center'>
          {data.map((elem) => {
            return (
              <Grid item md={12}>
                <h1>{elem.albumName}</h1>
                {elem.albumImages.map((elem) => {
                  return (
                    <div>
                      <img
                        src={elem}
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <hr></hr>
                    </div>
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default SuperUser;
