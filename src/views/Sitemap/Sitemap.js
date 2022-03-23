// import SortableTree from 'react-sortable-tree';
// import 'react-sortable-tree/style.css';
import React from 'react';
// import { config } from 'Constants.js';
// const defaultimage = require('assets/images/default.jpg');
import $ from 'jquery';
import Node from 'components/Node/Node.js';

export default class Sitemap extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = {
	    	treeData:[
	    		{
	    			label: 'Projects',
	    			children: [
	    				{
	    					label: 'Page',
	    					children: [
	    						{ 
	    							label: 'Page' 
	    						}, 
	    						{ 
	    							label: 'Page', 
	    							children: [ 
	    								{ label: 'Page' },
	    								{ label: 'Page' },
	    								{ label: 'Page' },
	    								{ label: 'Page' }
	    							]
    							}, 
	    						{ 
	    							label: 'Page', 
	    							children: [ 
	    								{ label: 'Page' }
	    							]
    							}
    						]
    					},
    					{
	    					label: 'Page',
	    					children: [
	    						{ 
	    							label: 'Page' 
	    						}, 
	    						{ 
	    							label: 'Page', 
	    							children: [ 
	    								{ label: 'Page' },
	    								{ label: 'Page' },
	    								{ label: 'Page' },
	    								{ label: 'Page' }
	    							]
    							}, 
	    						{ 
	    							label: 'Page', 
	    							children: [ 
	    								{ label: 'Page' }
	    							]
    							}
    						]
	    				},
    					{
	    					label: 'Page',
	    					children: [
	    						{ 
	    							label: 'Page' 
	    						}, 
	    						{ 
	    							label: 'Page', 
	    							children: [ 
	    								{ label: 'Page' },
	    								{ label: 'Page' },
	    								{ label: 'Page' },
	    								{ label: 'Page' }
	    							]
    							}, 
	    						{ 
	    							label: 'Page', 
	    							children: [ 
	    								{ label: 'Page' }
	    							]
    							}
    						]
	    				},
	    				{
	    					label: 'Page',
	    					children: [
	    						{ 
	    							label: 'Page' 
	    						}, 
	    						{ 
	    							label: 'Page', 
	    							children: [ 
	    								{ label: 'Page' },
	    								{ label: 'Page' },
	    								{ label: 'Page' },
	    								{ label: 'Page' }
	    							]
    							}, 
	    						{ 
	    							label: 'Page', 
	    							children: [ 
	    								{ label: 'Page' }
	    							]
    							}
    						]
    					},
    				]
    			}
    		]
    	};
    	this.updateSitemap = this.updateSitemap.bind(this);
	}
	updateSitemap(tp) {
		var nd = $('.current').parents('li').get();
		let v = this.state.treeData;
		for (var i = nd.length - 1; i >= 0; i--) {
			console.log($(nd[i]).data('parent'));
		}
	}
	componentDidMount() {
		$('.page').hover(function(e){
			$('.page').removeClass('current');
			let t = $(this).offset().top + 10;
			let l = $(this).offset().left + 130;
			let t1 = $(this).offset().top + 50;
			let l1 = $(this).offset().left + 30;
			$(this).addClass('current');
			if (!$(e.target).hasClass('page-root')) {
				$('.arrow_box_r_c').css('top',t+'px').css('left',l+'px').show();
			}
			$('.arrow_box_b_c').css('top',t1+'px').css('left',l1+'px').show();
		},function(e){
			if($(e.relatedTarget).hasClass('drag-con') || $(e.relatedTarget).hasClass('tree-node')){
				$('.arrow_box_b_c, .arrow_box_r_c').hide();
				$('.page').removeClass('current');
			}
		});
		$('.arrow_box_b_c, .arrow_box_r_c').mouseleave(function(e){
			if($(e.relatedTarget).hasClass('drag-con') || $(e.relatedTarget).hasClass('tree-node')){
				$('.arrow_box_b_c, .arrow_box_r_c').hide();
				$('.page').removeClass('current');
			}
		})
	}
	// render() {
	//     return (
	//       <div style={{ height: 400 }}>
	//         <SortableTree
	//           treeData={this.state.treeData}
	//           onChange={treeData => this.setState({ treeData })}
	//         />
	//       </div>
	//     );
	// }
	render() {
		return (
			<div className="container home">
				<div className="tree-con map-view" id="smap-con">
			       	<div className="drag-con"></div>
			       	{this.state.treeData.map((item, index) => <ul key={index} className="tree-children root" id="smap-ul"><Node level={0} nodeIdx={index} chCnt={item.children && item.children.length} isRoot={true} {...item} /></ul>)}
			    </div>
			    <div className="arrow_box_b_c action-box" data-a="sub" onClick={()=>this.updateSitemap('sub')} style={{top: '240px', left: '754.5px', display: 'none'}}>
					<div className="arrow_box_b"><i className="fa fa-plus-circle green ic-add ic-pg tooltip-s" data-act="add" aria-hidden="true"></i> sub page </div>
				</div>
				<div className="arrow_box_r_c action-box" data-a="lvl" onClick={()=>this.updateSitemap('lvl')} style={{top: '269px', left: '442.5px', display: 'none'}}>
				  	<div className="arrow_box_r"><i className="fa fa-plus-circle green ic-add ic-pg tooltip-s" data-act="add" aria-hidden="true"></i> same level page</div>
				</div>
			</div>
		);
	}
}