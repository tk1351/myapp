const express = require('express')

module.exports = {
  hello: (req, res) => {
    return res.json({ message: 'Hello world' })
  },
}
