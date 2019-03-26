/*********************************************************************************************************************
 *
 *
 *
 *********************************************************************************************************************/

const Chartist = require( 'chartist' );

const ajax = require( 'util/ajax' );
const { generateGraphData } = require( 'util/admin/stats-functions' );

const ctDateAxis = require( 'util/admin/date-axis' )( Chartist );

const BUCKET_WIDTH = 20;
const Y_TICKS = 4;

function LineGraph( elRoot, options )
{
  let elContainer;
  let elButtons;
  let oChart = null;

  let oLastMeta;

  /**
   * Delegate function that the ctDateAxis plugin can use to get the most recent data, because JS scoping is weird.
   *
   * @return {Object} oLastMeta
   */
  function getAxisData()
  {
    return oLastMeta;
  }

  /**
   * Redraws the graph.
   *
   * @param {Object} oRawData - the data returned from the API.
   */
  function redraw( oRawData )
  {
    // 1. get the data
    const { data, options, meta } = generateGraphData( oRawData, Math.ceil( elRoot.clientWidth / BUCKET_WIDTH ), Y_TICKS );
    oLastMeta = {
      query: oRawData.query,
      meta
    };

    // 2. specify additional options, including disabling the inbuilt X-axis and doing it ourselves 🙄
    options.axisX = { showGrid: false, showLabel: false };
    options.fullWidth = true;
    options.chartPadding = {
      top:    10,
      bottom: 5,
      left:   10,
      right:  50
    };
    options.plugins = [
      ctDateAxis({
        fnGetData: getAxisData
      })
    ];

    // 3. either draw or update the graph
    if ( oChart === null )
    {
      oChart = new Chartist.Line( elContainer, data, options );
    }
    else
    {
      oChart.update( data, options, true );
    }
  }

  /**
   * Event handler when the user clicks on a filter button: loads data from the server.
   *
   * @param {String} sPeriod - the period to update to
   * @param {Boolean} bRetrigger - true to update all other stats, false otherwise
   */
  function loadData( sPeriod, bRetrigger = false )
  {
    // update buttons
    elButtons.forEach( el => el.classList.toggle( '-current', ( el.dataset.period === sPeriod )));

    // pickle off a request
    ajax( options.endpoint + `period=${sPeriod}` ).then( redraw ).then( () =>
    {
      if ( bRetrigger )
      {
        elRoot.dispatchEvent( new CustomEvent( 'statsRangeChanged', { bubbles: true, detail: { period: sPeriod }}));
      }
    });
  }

  /** Constructor logic. */
  return (function init()
  {
    // 1. get the container
    elContainer = elRoot.querySelector( '[data-graph]' );
    if ( elContainer === null )
    {
      return elContainer;
    }

    // 2. hook filters
    elButtons = elRoot.querySelectorAll( '[data-period]' )
    elButtons.forEach( el => el.addEventListener( 'click', ev => loadData( el.dataset.period, !ev.altKey )));

    // 3. patch endpoint + load data
    options.endpoint += ( options.endpoint.indexOf( '?' ) === -1 ) ? '?' : '&';
    loadData( options.period );

    // 4. bind up
    elRoot.parentNode.addEventListener( 'statsRangeChanged', ev =>
    {
      if ( ev.target !== elRoot )
      {
        loadData( ev.detail.period );
      }
    });

  }());
}

module.exports = {
  name: 'lineGraph',
  init: LineGraph,
  defaults: {
    endpoint: null,
    period: '1W'
  }
};
