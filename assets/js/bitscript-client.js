/**
 * ===================
 * @ START
 * ===================
**/
$ ( function ()
{
	"use strict";

	/**
	 * ===================
	 * @ LANDING
	 * ===================
	**/
		/**
		 * ===================
		 * @ VAR
		 * ===================
		**/
		var	_navbar = ".bit-sidebar ";

		/**
		 * ===================
		 * @ TOGGLE BUTTON
		 * ===================
		**/
		$ ( '.toggle' ).click ( function ()
		{
			$ ( _navbar + '.toggle a' ).toggleClass ( 'active' );
			$ ( 'body' ).toggleClass ( 'pushy' );
		});

		/**
		 * ===================
		 * @ TOGGLE OVERLAY
		 * ===================
		**/
		$ ( '.bit-overlay' ).click ( function ()
		{
			$ ( _navbar + '.toggle a' ).toggleClass ( 'active' );
			$ ( 'body' ).toggleClass ( 'pushy' );
		});

		/**
		 * ===================
		 * @ ACTIVE MENU
		 * ===================
		**/


		/**
		 * ===================
		 * @ SKILL
		 * ===================
		**/
		var o = {
			init: function ()
			{
				this.diagram ();
			},
			random: function ( l, u )
			{
				return Math.floor ( ( Math.random () * ( u - l + 1 ) ) + l );
			},
			diagram: function ()
			{
				let r = Raphael ( 'diagram', 600, 600 ),
					rad = 73,
					defaultText = 'SKILLS',
					speed = 250;

				r.circle ( 300, 300, 85 ).attr ({
					stroke: 'none', fill:
					'#193340'
				});

				let title = r.text ( 300, 300, defaultText ).attr({
					font: '20px Arial',
					fill: '#ffffff'
				}).toFront ();

				r.customAttributes.arc = function ( value, color, rad )
				{
					let v = 3.6 * value,

						alpha = v == 360 ? 359.99 : v,
						random = o.random ( 91, 240 ),
						a = ( random - alpha ) * Math.PI / 180,
						b = random * Math.PI / 180,
						sx = 300 + rad * Math.cos ( b ),
						sy = 300 - rad * Math.sin ( b ),
						x = 300 + rad * Math.cos ( a ),
						y = 300 - rad * Math.sin ( a ),
						path = [ [ 'M', sx, sy ], [ 'A', rad, rad, 0, + ( alpha > 180 ), 1, x, y ] ];

					return { path: path, stroke: color }
				}
				
				$ ( '.get' ).find ( '.arc' ).each ( function ( i )
				{
					let t = $ ( this ), 
						color = t.find ( '.color' ).val (),
						value = t.find ( '.percent' ).val (),
						text = t.find ( '.text' ).text ();

					rad += 30;

					let z = r.path ().attr ({
						arc: [ value, color, rad ], 'stroke-width': 26
					});

					z.mouseover ( function ()
					{
						this.animate({
							'stroke-width': 50,
							opacity: .75
						}, 1000, 'elastic' );

						if ( Raphael.type != 'VML' )
						this.toFront ();

						title.stop ().animate ({
							opacity: 0
						}, speed, '>', function ()
						{
							this.attr ({
								text: text + '\n' + value + '%'
							}).animate ({
								opacity: 1
							}, speed, '<' );
						});
					}).mouseout ( function ()
					{
						this.stop ().animate ({
							'stroke-width': 26,
							opacity: 1
						}, speed * 4, 'elastic' );

						title.stop ().animate ({
							opacity: 0
						}, speed, '>', function ()
						{
							title.attr ({
								text: defaultText
							}).animate ({
								opacity: 1
							}, speed, '<' );
						});	
					});
				});
			}
		}

		o.init ();

		/**
		 * ===================
		 * @ GALLERY
		 * ===================
		**/
		var _selectedClass;

		$ ( '.filter' ).click ( function ()
		{
			_selectedClass = $ ( this ).attr ( 'data-rel' );

			$ ( '.portfolio .gallery' ).fadeTo ( 100, 0.1 );
			$ ( '.portfolio .gallery div.pics' ).not ( '.' + _selectedClass )
								.fadeOut ()
								.removeClass ( 'animation' );

			setTimeout ( function ()
			{
				$ ( '.' + _selectedClass ).fadeIn ().addClass ( 'animation' );
				$ ( '.portfolio .gallery' ).fadeTo ( 300, 1 );
			}, 300 );
		});

		/**
		 * ===================
		 * @ SCROLL
		 * ===================
		**/
		$ ( '.bit-top' ).click ( function ( e )
		{
			$ ( '.bit-content' ).animate (
			{
				scrollTop: $ ( '.bit-content' ).offset ().top
			}, 2000 );

			return false;
		});
});