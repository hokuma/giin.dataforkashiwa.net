import React, { Component } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';
import GiinData from './GiinData';
import './Member.css';

class Member extends Component {
  componentDidMount() {
    this.renderWordCloud();
  }

  componentDidUpdate() {
    this.renderWordCloud();
  }

  renderWordCloud() {
    if(!this.giin) { return; }

    const maxCount = this.giin.tfidf[0][1];
    const sizeScale = d3.scaleLinear().domain([1, maxCount]).range([10,100]);
    const words = this.giin.tfidf.map((d) => {
      return {text: d[0], size: sizeScale(d[1])};
    });

    this.layout = cloud().size([960, 600])
      .words(words)
      .fontSize((d) => { return d.size; })
      .rotate(() => { return 0; })
      .on('end', this.draw.bind(this));
    this.layout.start();
  }

  draw(words) {
    const fill = d3.scaleOrdinal(d3.schemeCategory20);
    const width = this.layout.size()[0];
    const height = this.layout.size()[1];
    d3.select(this.node)
      .select('g')
      .remove();
    d3.select(this.node)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .selectAll('text')
      .data(words)
      .enter().append('text')
      .style('font-size', (d) => { return d.size + 'px'; })
      .style('font-family', 'Impact')
      .style('fill', (d, i) => { return fill(i); })
      .attr('text-anchor', 'middle')
      .attr('transform', (d) => { return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'; })
      .text((d) => { return d.text; });
  }

  get giinName() {
    return this.props.match.params.name;
  }

  get giin() {
    return this.props.giins ? this.props.giins[this.giinName] : null;
  }

	renderRoles(roles) {
		if(roles) {
      return (
        <ul>
          {roles.map((role, index) => { return <li key={index}>{role}</li>; })}
        </ul>
      );
		} else {
			return 'なし';
		}
	}

  render() {
    const name = this.giinName;
    const giin = this.giin;
    if(giin) {
      return (
        <div className='Member'>
          <Breadcrumb>
            <BreadcrumbItem><a href="/">Top</a></BreadcrumbItem>
            <BreadcrumbItem active>{name}</BreadcrumbItem>
          </Breadcrumb>
          <h2>{name}</h2>
					<section>
						<dl>
							<dt>URL</dt>
							<dd><a href={GiinData[name].url} target='_blank'>{GiinData[name].url}</a></dd>
              <dt>発言回数</dt>
              <dd>{giin.count}回</dd>
							<dt>議長、監査委員期間</dt>
							<dd>{this.renderRoles(GiinData[name].roles)}</dd>
						</dl>
					</section>
          <section>
            <h3>頻繁に言及されるワード</h3>
            <p>
              言及回数が多いワードほど表記が大きくなります。
              発言回数が少ない場合はワードの頻度にばらつきが出ないため、文字サイズも均一になりがちです。
              したがって、十数回程度の発言回数の議員については、本人の特徴をうまく反映できていない可能性が高いです。
            </p>
            <div>
              <svg className='word-cloud' ref={node => this.node = node}></svg>
            </div>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }
}

Member.propTypes = {
  giins: PropTypes.object,
};

export default Member;
