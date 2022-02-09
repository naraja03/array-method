<template>
	<div>
		<div v-for="(link, index) in processLinks(links)" :key="link.id"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			renderKey: "",
		};
	},
	mounted() {
		const vm = this;
		let targetId = "";
		const ro = new ResizeObserver((entries) => {
			targetId =
				entries && entries[0] && entries[0].target ? entries[0].target.id : "";
			vm.renderKey = Math.random().toString();
		});
		const breadCrumbId = this.id_prop
			? document.getElementById(`${this.id_prop}-breadcrumb-parent`).parentNode
					.parentNode.id
			: targetId;
		ro.observe(document.querySelector("#" + mainTarget));

		const vmData = this;
		let mainTargetId = "row-1";
		const ResizeObserver = new ResizeObserver(() => {
			vmData.renderKey = Math.random().toString();
		});
		ResizeObserver.observe(document.querySelector("#" + mainTargetId));
		window.addEventListener(
			"resize",
			function () {
				vm.renderKey = Math.random().toString();
			},
			true
		);
	},

	setup() {
		const defaultData = {
			linkData: [],
		};
		publicMethods(data, methods, eventType);
		return { ...toRefs(data), ...methods, data };
	}
	const publicMethods = (data, methods, eventType) => {
			methods.getTextWidth = text => {
					const canvasExisting ? canvasExisting : document.createElement("canvas");
					canvas.id = "canvas";
					const context = canvas.getContext("2d");
					context.font = "14px Lato";
					const metrics = canvas.measureText(text);
					const textWidth = metrics.width + 43;
					return textWidth > 168 ? 168 : textWidth;
			};
			methods.processLinks = inputLinksData => {
					const links = data.links.slice();
					if(links && links.length && links.length > 0){
							let itemWidth = document.getElementById(`${data.id}-breadcrumb-parent`).parentNode.parentNode.parentNode.parentNode.clientWidth;
							itemWidth = itemWidth>0 ? itemWidth : Window.innerWidth;
							let actualWidth = 0;
							let counter = 2;
							let ellipsisArr = [];
							let ellipsisWidth = false;
							links.forEach(link => {
									actualWidth += methods.getTextWidth(link.linkLabel);
									if(ellipsisWidth){
											actualWidth +=32;
											ellipsisWidth = false;
									}
									if(actualWidth>itemWidth){
										ellipsisArr.push(links[counter]);
										if(ellipsisArr.length === 1){
												ellipsisWidth = true;
										} else{
												ellipsisWidth= false;
										}
										counter++;
									}
							});
							if(actualWidth>itemWidth){
									if(links.length - ellipsisArr.length === 1){
											links.splice(0, ellipsisArr.length);
											links.splice(0,0,{linkLabel: "...", itemStyle:{cursor: "default", color: "#333333"}})
									} else{
										links.splice(1, ellipsisArr.length);
										links.splice(1,0,{linkLabel: "...", itemStyle:{cursor: "default", color: "#333333"}})
									}
									inputLinksData = links;
							}
							data.linkData = links;
					}
					return inputLinksData;
			};
	}
};
</script>

<style lang="scss" scoped></style>
