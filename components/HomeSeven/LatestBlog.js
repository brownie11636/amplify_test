import React, { Component } from 'react'
import Link from 'next/link'

export default class LatestBlog extends Component {
  render() {
    return (
      <>
          <div className="ai-blog-area pt-100 pb-70">
            <div className="container">
                <div className="section-title with-underline-text">
                    <h2>Latest Blog and News Don’t Miss Any <b>Updates</b> and News!</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. A ac, ut eget pellentesque nulla viverr.</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="ai-blog-card">
                            <div className="entry-thumbnail">
                                <Link href="/blog-details">
                                    <a><img src="/images/home-six/blog/blog1.jpg" alt="image" /></a>
                                </Link>
                            </div>
                            <div className="entry-post-content">
                                <div className="tag">
                                    <Link href="/blog-details">
                                        <a>TECHNOLOGY</a>
                                    </Link>
                                </div>
                                <h3>
                                    <Link href="/blog-details">
                                        <a>Making Peace With The Feast Or Famine Of Freelancing</a>
                                    </Link>
                                </h3>
                                <ul className="entry-meta">
                                    <li>By <a href="#">Thomas Kelbin</a></li>
                                    <li>17th January</li>
                                    <li>0 Comment</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="ai-blog-card">
                            <div className="entry-thumbnail">
                                <Link href="/blog-details">
                                    <a><img src="/images/home-six/blog/blog2.jpg" alt="image" /></a>
                                </Link>
                            </div>
                            <div className="entry-post-content">
                                <div className="tag">
                                    <Link href="/blog-details">
                                        <a>TECHNOLOGY</a>
                                    </Link>
                                </div>
                                <h3>
                                    <Link href="/blog-details">
                                        <a>I Used The Web For A Day On A 50 MB Budget</a>
                                    </Link>
                                </h3>
                                <ul className="entry-meta">
                                    <li>By <a href="#">Thomas Kelbin</a></li>
                                    <li>17th January</li>
                                    <li>0 Comment</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="ai-blog-card">
                            <div className="entry-thumbnail">
                                <Link href="/blog-details">
                                    <a><img src="/images/home-six/blog/blog3.jpg" alt="image" /></a>
                                </Link>
                            </div>
                            <div className="entry-post-content">
                                <div className="tag">
                                    <Link href="/blog-details">
                                        <a>TECHNOLOGY</a>
                                    </Link>
                                </div>
                                <h3>
                                    <Link href="/blog-details">
                                        <a>Here Are The 5 Most Telling Signs Of Micromanagement</a>
                                    </Link>
                                </h3>
                                <ul className="entry-meta">
                                    <li>By <a href="#">Thomas Kelbin</a></li>
                                    <li>17th January</li>
                                    <li>0 Comment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }
}
