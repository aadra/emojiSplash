const API_KEY = 'sk-y96ljoPajSehgepSkwIbRZ9HxmFra1j5jD81imH2NpT3BlbkFJMc678QD9KFasgS_DyJ66OiUY-hAoWVdkSRngGdXyIA';


import React, { useState } from 'react';

import axios from 'axios';

 

const App = () => {

  const [emoji1, setEmoji1] = useState('');

  const [emoji2, setEmoji2] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);

 

  const handleSubmit = async () => {

    if (!emoji1 || !emoji2) {

      alert("Please enter two emojis!");

      return;

    }

 

    setLoading(true);

 

    try {

      const prompt = `Merge these two emojis into a single new emoji with exactly two eyes.: ${emoji1} and ${emoji2}.`;

     

      const response = await axios.post(

        'https://api.openai.com/v1/images/generations',

        {

          model: 'dall-e-3',

          prompt: prompt,

          n: 1,

          size: '1024x1024'

        },

        {

          headers: {

            Authorization: 'Bearer ' + API_KEY,

            'Content-Type': 'application/json'

          }

        }

      );

 

      //const imageUrl = response.data.data[0].url;

      const imageUrl = response.data.data[0].url;

      setImageUrl(imageUrl);

    } catch (error) {

      console.error('Error generating image:', error);

      alert('Failed to generate the smashed emoji.');

    }

 

    setLoading(false);

  };

 

  return (

    <div style={{ textAlign: 'center', padding: '50px' }}>

      <h1>Emoji Smash App</h1>

      <p>

      😆😍😃😄😁😆😅🤣😂🙂😉😊<br></br>

      😇🥰🤩😘😗😚😙🥲😏😋😛😜<br></br>

      🤪😝🤑🤗🤭🫢🫣🤫🤔🫡🤤🤠<br></br>

      🥳🥸😎🤓🧐🫠🤐🤨😐😑😶🫥<br></br>

      😶‍🌫️😒🙄😬😮‍💨🤥🫨🙂‍↔️🙂‍↕️🦑🙃😌<br></br>

      😪😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵<br></br>

      😵‍💫🤯🥱😕🫤😟🙁☹️😮😯😲😳<br></br>

      🥺🥹😦😧😨😰😥😢😭😱😖😣<br></br>

      😞😓😩😫😤😡😠🤬👿😈👿💀<br></br>

      ☠️💩🤡👹👺👻👽👾🤖😺😸😹<br></br>

      😻😼😽🙀😿😾🙈🙉🙊<br></br>

      </p>

     

 

      <input

        type="text"

        placeholder="Enter first emoji"

        value={emoji1}

        onChange={(e) => setEmoji1(e.target.value)}

        style={{ fontSize: '24px', marginRight: '10px' }}

      />

      <input

        type="text"

        placeholder="Enter second emoji"

        value={emoji2}

        onChange={(e) => setEmoji2(e.target.value)}

        style={{ fontSize: '24px' }}

      />

 

      <br/><br/>

 

      <button onClick={handleSubmit} style={{ fontSize: '20px', padding: '10px 20px' }}>

        {loading ? 'Generating...' : 'Smash Emojis'}

      </button>

 

      <br/><br/>

 

      {imageUrl && (

        <div>

          <h3>Generated Emoji:</h3>

          <img src={imageUrl} alt="Smashed emoji" style={{ width: '600px', height: '600px' }} />

        </div>

       

      )}

    </div>

  );

};

 

export default App;