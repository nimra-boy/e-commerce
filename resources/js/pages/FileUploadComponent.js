import React, { Component } from 'react';

export default class FileUploadComponent extends Component
{
  render()
   {
      return(
        <form>
        <h1>File Upload</h1>
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
      )
   }
}