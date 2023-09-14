<template>
    <div>
        <h1>Database</h1>
        <hr />
        <div class="tabs is-centered ">
            <div class="column">
                <form>
                    <p>
                    <textarea contenteditable="true" name="query" rows="20" cols="80" class="" spellcheck="false" wrap="off" 
                         v-model="sqlQuery"></textarea>
                    </p>
                    <p>
                        <input type="button" value="Execute" title="Ctrl+Enter" class="button" @click="execute">
                    </p>
                </form>
            </div>
        </div>
        <h3>Your SQL results: </h3>

        <div class=" table-container is-flex is-justify-content-center">
            
            <div id="scrollable-table">
                <div v-html="tableHtml"></div>
            </div>
        </div>
    </div>
</template>


<script>
import lib from '!/library-web/lib';
import utils from '@/utils';

export default {
    name: 'database',
    data() {
        return {
            sqlQuery:'',
            sqlResult:[],
            tableHtml:'',
            dataTabel:''
        }
    },
    methods: {
        // 
        async execute() {
            console.log('executing SQL query...');
            console.log(this.sqlQuery);
            let data = {
                query: this.sqlQuery
            };
            const result = await utils.api.post('/sql', data);
            console.log('The results', result);
            if (result.status) {
                this.sqlResult = result.data;
                console.table(this.sqlResult);

                this.tableHtml = this.Array2Table(this.sqlResult);
                // $("div").html(this.tableHtml);

            } else {
                console.log('Something went wrong.', result.error);
                this.tableHtml = '<p style="color: red;">' + result.error + '</p>';
            }
            },
        // 
        Array2Table(arr) {
            let Table = [];
            let top_row = [];
            let rows = [];

            for (let i = 0; i < arr.length; i++) {
                let cells = [];

                for (let property in arr[i]) {
                    if (top_row.length < Object.keys(arr[i]).length) {
                        top_row.push(`<th scope="col">${property}</th>`);
                    }
                    if (arr[i][property] === null) {
                        cells.push(`<td>${null}</td>`);
                    } else {
                        cells.push(`<td>${arr[i][property]}</td>`);
                    }
                }

                rows.push(`<tr>${cells.join("")}</tr>`);
            }

            Table.push(`<table class="table card-table table-striped">`);
            Table.push(`<thead>${top_row.join("")}</thead>`);
            Table.push(`<tbody>${rows.join("")}</tbody>`);
            Table.push("</table>");
            return Table.join("");
        },
        // 
        async logout() {
            await utils.api.get('/auth/logout');
            lib.store.clearSession();
            lib.store.clear();
            lib.emitter.emit('logout');
        },
    },
};
</script>

<style>
#scrollable-table {
    height: 450px; /* Adjust the height as needed */
    overflow: auto;
}

@media only screen and (-webkit-min-device-pixel-ratio: 2)
{ 
    #scrollable-table {
    height: 330px; /* Adjust the height as needed */
    overflow: auto;
}
}

</style>
