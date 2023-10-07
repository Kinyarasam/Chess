#!/usr/bin/env node

class AppController {
  static dashboard(req, res) {
    const data = {
      title: 'Chess Dashboard',
      message: 'Welcome to the Dashboard'
    }

    res.render('dashboard', { data: data });
  }

  static getStats(req, res) {
    return
  }

  static getStatus(req, res) {
    return
  }
}

export default AppController;
