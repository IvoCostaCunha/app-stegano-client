import React, { Component, createContext } from "react";

import { AuthContext } from "./AuthContext";

export const DataContext = createContext()

export default class DataContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // For later
    }
  }

  requestDownload = async (filesId, id) => {
    try {
      const request = await fetch('https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/files/upload-request', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filesId: filesId,
          id: id
        }),
      })

      const requestJSON = await request.json()
      if (request.status === 200) {
        console.log(requestJSON.message)
        return { message: requestJSON.message, confirmation: true, code: request.status, files: requestJSON.files }
      }
      else {
        return { message: requestJSON.error, confirmation: false, code: request.status }
      }


    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "None" }
    }
  }

  sendPngFiles = async (id, files) => {
    try {
      const request = await fetch("https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/files/upload", {
        method: "POST",
        body: files
      })

      const requestJSON = await request.json()

      if (request.status === 200) {
        const downloadId = requestJSON.download_id

        const downloadRequest = await fetch("https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/files/download-request", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filesId: downloadId,
            userId: id
          }),
        })

        const downloadRequestJSON = await downloadRequest.json()

        if (downloadRequest.status == 200) {
          downloadRequestJSON['urls'].forEach(url => {
            this.dowloadFileFromAWS(url.url)
          })
          return { message: requestJSON.message, confirmation: true, code: request.status }
        }
        else {
          return { error: requestJSON.error, confirmation: false, code: request.status }
        }


      }
      else {
        return { error: requestJSON.error, confirmation: false, code: request.status }
      }
    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "Unknown" }
    }
  }

  getPngFilesFromId = async (id) => {
    try {
      // "https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/files/getfilesbyid"
      const request = await fetch("http://localhost:5000/api/0.1/files/getfilesbyid", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        }),
      })

      const requestJSON = await request.json()

      if (request.status === 200) {
        return { message: requestJSON.message, confirmation: true, code: request.status, data: requestJSON.files }
      }
      else {
        return { error: requestJSON.error, confirmation: true, code: request.status }
      }


    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "Unknown" }
    }
  }

  downloadFileFromUrl = async (url, filename) => {
    try {
      const request = await fetch(url, {
        method: "GET"
      })

      const requestData = await request.blob()

      if (request.status === 200) {
        const a = document.createElement('a');
        a.download = filename + '.' + requestData.type;
        a.href = window.URL.createObjectURL(requestData);
        a.click()
        a.remove()
        return { message: "Download sucessful.", confirmation: true, code: request.status }
      }
      else {
        return { error: "Download failed.", confirmation: false, code: request.status }
      }
    } catch (err) {
      console.log(err)
      return { error: 'Download failed.', confirmation: false, code: "Unknown" }
    }
  }

  dowloadFileFromAWS = async (url) => {
    const a = document.createElement('a');
    a.href = url
    a.click()
    a.remove()
    return { message: "Download sucessful.", confirmation: true, code: 'None' }
  }

  deletePngFiles = async (id, filename) => {
    // ask API to delete file
    return { message: "TODO", confirmation: true, code: "unknown" }
  }

  render() {
    return (
      <DataContext.Provider value={{
        ...this.state,
        sendPngFiles: this.sendPngFiles,
        getPngFiles: this.getPngFiles,
        requestDownload: this.requestDownload,
        downloadFileFromUrl: this.downloadFileFromUrl,
        getPngFilesFromId: this.getPngFilesFromId,
        dowloadFileFromAWS: this.dowloadFileFromAWS,
        deletePngFiles: this.deletePngFiles
      }}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}