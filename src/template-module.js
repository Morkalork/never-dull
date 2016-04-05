'use strict';

/**
 *  This module is only meant to be a template for new modules. Feel free to copy it
 *  and use it as a template.
 */
export class IChallange {

  /****************************************
   *  PROPERTIES
   ***************************************/

  /** 
   *    @type   {string}    The name of the plugin, used as REST base (such as http://localhost/never-dull/NAME)
   */
  get name() {}

  /**
   *    @type   {string}    The description for the plugin
   */
  get description() {}

  /**
   *    @type   {string}    Instructions for this plugin, can use line break (\n) and markdown
   */
  get instructions() {}

  /**
   *    @type   {int}   The difficulty level of the challange on a scale of 1 to 10. 
   *    Novice=1, Beginner=2, Basic=3, Medium=4, Hard=5, Tough=6, Very Hard=7, Insane=8, Extreme=9, Impossible=10
   */
  get difficulty() {}

  /**
   *    @type   {string[]}  An array of (thought through) types to further describe this challange
   *    ex. Mathematical, String Parsing, Logical, Brute Force, Encoding, Graph Theory, etc
   */
  get type() {}


  /****************************************
   *  METHODS
   ***************************************/

  /**
   *    Handle get requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  get(request, response) {}

  /**
   *    Handle post requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  post(request, response) {}

  /**
   *    Handle put requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  put(request, response) {}

  /**
   *    Handle delete requests
   *
   *    @param {object} request - A http request object with the player data
   *    @param {object} response - A http response object to communicate back to the player
   */
  delete(request, response) {}
}
