import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row } from "reactstrap";
import classnames from "classnames";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import Tax from "./Tax";

const index = () => {
  const [activeTab, setActivetab] = useState("1");
  const [taxRender, settaxRender] = useState(false);

  function toggle(tab) {
    if (activeTab !== tab) {
      setActivetab(tab);
    }
  }
  return (
    <div>
      <div className="content">
        <Row>
          <div className="page-title d-flex">
            <div className="float-left">
              <h1 className="title">Category</h1>
            </div>
           
          </div>
          <div className="container-fluid text-center">
              <p style={{ color: "red", fontWeight: "bold" }}>
                Before creating a new Category, add Tax for that Category !
              </p>
            </div>
          <div className="col-12">
            <div className="content-body">
              <div className="row">
                <div className="col-lg-12">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Add & View
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Tax
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <AddCategory taxRender={taxRender} />
                    </TabPane>
                    <TabPane tabId="2">
                      <Tax taxRender={taxRender} settaxRender={settaxRender} />
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default index;
