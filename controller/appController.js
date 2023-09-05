#!/usr/bin/env node

import app from "../server";

class appController {
  static getIndex(req, res) {
    return res.status(200).json({ message: 'Build Something fun!!!' })
  }
}

export default appController