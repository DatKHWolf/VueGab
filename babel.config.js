/* module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
  Kann sonst Probleme geben bei Axios und vergleichbaren Promises
  
 */
module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      corejs:"core-js@3",
    }]
  ]
}