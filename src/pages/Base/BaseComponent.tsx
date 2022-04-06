import React, { Component } from "react";
import BaseEntity from "../../models/Base/BaseEntity";
import { colors } from "../../design/colors";

// contexts
import { AuthContext } from "../../contexts/auth/auth.context";

// services
import BaseService from "../../services/Base/base.service";

// view models
import PaginationFilter from "../../viewModels/PaginationFilter";

// components
import Task from "../../components/Task";
import Alert from "../../components/Alert";
import Toolbar from "../../components/Task/Toolbar";
import Pagination from "../../components/Task/Pagination";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";

// styles
import {
    GridFooter,
    GridContent,
    GridToolbar,
    GridContainerTCF,
} from "../../design/grid";
import { PageView } from "../../design";

// types
import { RouteComponentProps } from "react-router";
import { RowProps, TableHeadProps } from "../../components/Task/types";

// Your component own properties
class PropsType<T> {
    rows: Array<T> = [];
    open: boolean = false;
    loading: boolean = true;
    processing: boolean = false;
    selecteds: Array<string> = [];
    pagination: PaginationFilter = new PaginationFilter();
    errors: Array<string> = [];
    warnings: Array<string> = [];
    tab: number = 0;
};

class BaseComponent<T extends BaseEntity> extends Component<RouteComponentProps, PropsType<T>> {
    title: string = "Title";
    state: PropsType<T> = new PropsType<T>();
    static contextType = AuthContext;

    head_labels: Array<TableHeadProps> = [];

    constructor(props: any, public service: BaseService<T>) {
        super(props);

        this.setTab = this.setTab.bind(this);
        this.setRows = this.setRows.bind(this);
        this.setOpen = this.setOpen.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.setWarnings = this.setWarnings.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.createRows = this.createRows.bind(this);
        this.setSelecteds = this.setSelecteds.bind(this);
        this.setProcessing = this.setProcessing.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.setPagination = this.setPagination.bind(this);
        this.handleDeleteSingle = this.handleDeleteSingle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleUpdateField = this.handleUpdateField.bind(this);
        this.handleChangeSelecteds = this.handleChangeSelecteds.bind(this);
        this.handleOpenAlert = this.handleOpenAlert.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.RenderComponent = this.RenderComponent.bind(this);
    }

    componentDidMount()
    {
        this.index();
    }

    setLoading(loading: boolean)
    {
        this.setState({ loading });
    }

    setProcessing(processing: boolean)
    {
        this.setState({ processing });
    }

    setRows(rows: Array<T>)
    {
        this.setState({ rows });
    }

    setTab(tab: number)
    {
        this.setState({ tab });
    }

    setOpen(open: boolean)
    {
        this.setState({ open });
    }

    setSelecteds(selecteds: Array<string>)
    {
        this.setState({ selecteds });
    }
    
    setErrors(errors: Array<string>)
    {
        this.setState({ errors });
    }

    setWarnings(warnings: Array<string>)
    {
        this.setState({ warnings });
    }

    async index()
    {
        this.setErrors([]);
        this.setWarnings([]);
        this.setLoading(true);
        try {
            const response = await this.service.pagination(this.state.pagination);
            const pagination = response.data;

            this.setRows(pagination.data);
            this.setPagination("total_records", pagination.total_records);
            this.setPagination("total_pages", pagination.total_pages);
            this.setPagination("page_number", pagination.page_number);
            this.setPagination("page_size", pagination.page_size);

            this.setWarnings(response.warnings);
        } catch (error: any) {
            this.setErrors(error.response.data);
        }
        this.setLoading(false);
    }

    setPagination(key: string, value: any) {
        let pagination = this.state.pagination;
        pagination[key] = value;

        this.setState({ pagination });
    }

    handleChangePage(page: number) {
        this.setPagination = this.setPagination.bind(this);

        let page_number = 0;
        let pagination = this.state.pagination;

        if(page > 0) {
            page_number = pagination.page_size;
        }

        this.setPagination("page_number", page_number);
        this.setPagination("page", page);
    }

    handleChangeRowsPerPage(event: any) {
        this.setPagination = this.setPagination.bind(this);
        const rows_per_page = event.target.value;
        this.setPagination("page_size", rows_per_page);
        this.index();
    }

    handleChangeSelecteds(selecteds: Array<string>) {
        this.setSelecteds(selecteds);
    }

    handleEdit(id: string)
    {
        const pathname = this.props.location.pathname;
        this.props.history.push(`${pathname}/${id}/edit`, {main_title: this.title});
    }

    handleDelete()
    {
        this.handleCloseAlert = this.handleCloseAlert.bind(this);

        this.setProcessing(true);
        this.state.selecteds.forEach(async(id) => {
            await this.service.delete(id);
            this.setRows(this.state.rows.filter(x => x.id !== id));
        });
        this.setSelecteds([]);
        this.setProcessing(false);
        this.handleCloseAlert();
    }

    async handleDeleteSingle(id: string)
    {
        this.setProcessing(true);
        await this.service.delete(id);
        this.setRows(this.state.rows.filter(x => x.id !== id));
        this.setProcessing(false);
    }

    createRow(resource: T): RowProps
    {
        let row: RowProps = {
            id: resource.id,
            cells: []
        };

        return row;
    }

    createRows(rows: Array<T>)
    {
        return rows.map(this.createRow);
    }

    handleUpdateField(resource: T, event: any)
    {

    }

    handleSearch(text: string)
    {

    }

    handleOpenAlert()
    {
        this.setOpen(true);
    }

    handleCloseAlert()
    {
        this.setOpen(false);
    }

    RenderComponent()
    {
        return(
            <Task 
                onEditRow={this.handleEdit}
                headLabels={this.head_labels} 
                selecteds={this.state.selecteds}
                rows={this.createRows(this.state.rows)}
                onChangeSelecteds={this.handleChangeSelecteds}
            />
        );
    }

    render(){

        return(
            <GridContainerTCF>
                <Alert open={this.state.open} theme="error" title="Excluir Selecionados?" subtitle="Está ação não poderá ser desfeita." onConfirm={this.handleDelete} onCancel={this.handleCloseAlert} />
                <GridToolbar>
                    <Toolbar 
                        title={this.title} 
                        numSelected={this.state.selecteds.length} 
                        onAdd={() => this.handleEdit("0")} 
                        onDelete={this.handleOpenAlert} 
                        onSearch={this.handleSearch} 
                    />
                </GridToolbar>
                <GridContent horizontalScrollView={true}>
                    {this.state.loading ? <LoadingSpinner size={40} color={colors.PRIMARY} /> : (
                        <PageView>
                            <this.RenderComponent />
                            {this.state.errors && <ErrorComponent errors={this.state.errors} />}
                        </PageView> 
                    )}
                </GridContent>
                <GridFooter>
                    <Pagination 
                        page={this.state.pagination.page_number} 
                        limit={this.state.pagination.page_size} 
                        count={this.state.pagination.total_records} 
                        handleChangePage={this.handleChangePage}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </GridFooter>
            </GridContainerTCF>
        );
    };
};

export default BaseComponent;