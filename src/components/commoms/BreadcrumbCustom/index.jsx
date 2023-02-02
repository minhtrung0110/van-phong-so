import React from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb} from "antd";
import {Link, useLocation} from "react-router-dom";
import {dataConvertBreadcrumbLanguage} from "~/asset/data/data-convert-breadcrumb-language";

BreadcrumbCustom.propTypes = {

};

function BreadcrumbCustom(props) {
    const location = useLocation();
    const breadCrumbView = () => {
        const { pathname } = location;
        const pathnames = pathname.split("/").filter((item) => item);
        const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        return (
            <div>
                <Breadcrumb>
                    {pathnames.length > 0 ? (
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    )}
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        const label=dataConvertBreadcrumbLanguage.find((item) => (item.href===name)).label
                        return isLast ? (
                            <Breadcrumb.Item key={index}>{capatilize(label)}</Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item key={index}>
                                <Link to={`${routeTo}`}>{capatilize(label)}</Link>
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            </div>
        );
    };

    return <>{breadCrumbView()}</>;
}

export default BreadcrumbCustom;