<template>
	<svg
    width="100%"
    viewBox="0 0 180 110"
    preserveAspectRatio="none"
    style="overflow-x: auto;"
  >
    <g id="layer1">
      <circle
        id="path4518"
        cx="55.751484"
        cy="35.156994"
        r="6.614583"
        fille="#000000"
        class="table"
        @click="showTable('round')"
      />
      <ellipse
        id="path4520"
        cx="56.601933"
        cy="71.820686"
        rx="7.6540179"
        ry="15.308036"
        fill="#000000"
        class="table"
        @click="showTable('ellipse')"
      />
      <circle
        style="fill:#000000;stroke-width:0.26458332"
        id="path4518-6"
        cx="80.130951"
        cy="34.968006"
        r="6.6145835"
      />
      <circle
        style="fill:#000000;stroke-width:0.26458332"
        id="path4518-5"
        cx="104.49895"
        cy="35.078709"
        r="6.6145835"
      />
      <ellipse
        style="fill:#000000;stroke-width:0.26458332"
        id="path4520-8"
        cx="81.186607"
        cy="71.709976"
        rx="7.6540179"
        ry="15.308036"
      />
      <ellipse
        style="fill:#000000;stroke-width:0.26458332"
        id="path4520-3"
        cx="105.65303"
        cy="71.670837"
        rx="7.6540179"
        ry="15.308036"
      />
      <circle
        style="fill:#000000;stroke-width:0.26458332"
        id="path4518-5-8"
        cx="127.98607"
        cy="35.145535"
        r="6.6145835"
      />
      <ellipse
        style="fill:#000000;stroke-width:0.26458332"
        id="path4520-3-4"
        cx="128.93297"
        cy="71.776794"
        rx="7.6540179"
        ry="15.308036"
      />
    </g>
  </svg>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		methods: {
          	showTable(type) {
            	console.log("showTable: ", type);
            	this.$emit("showModal")
          	}
        }
	}
</script>

<style scoped>
	.table:hover {
        cursor: pointer;
        fill: yellow;
      }
</style>