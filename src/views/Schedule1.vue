<!--生成排班方案-->
<template>
  <div class="schedule-wrapper">
    <!-- 一键生成排班方案按钮 -->
    <el-button @click="generateSchedule" type="primary">一键生成排班方案</el-button>

    <!-- 一周排班按钮 -->
    <div v-if="weekSchedule">
      <div style="margin-top: 20px;">
        <el-button
            v-for="(day, index) in weekDays"
            :key="index"
            @click="viewSchedule(day)"
            :class="{'is-active': selectedDay === day}">
          {{ day }}
        </el-button>
      </div>

      <!-- 显示选中周的排班方案 -->
      <div v-if="selectedDay" class="schedule-detail" style="margin-top: 20px;">
        <h3>{{ selectedDay }} 的排班</h3>

        <!-- 时间轴 -->
        <div class="time-axis">
          <div v-for="time in timeSlots" :key="time" class="time-slot">
            {{ time }}
          </div>
        </div>

        <!-- 排班图表 -->
        <div class="schedule-chart">
          <div v-for="(shift, index) in shifts" :key="index" class="employee-row">
            <div class="employee-name">{{ shift.employeeName || '未分配' }}</div>
            <div class="shift-bars">
              <!-- 班次条 -->
              <div
                  v-if="shift.startTime && shift.endTime"
                  class="shift-bar"
                  :style="calculateBarStyle(shift.startTime, shift.endTime)"
                  @click="openShiftDetails(shift)"
                  title="点击查看班次详情"
              ></div>

              <!-- 午餐时间条 -->
              <div
                  v-if="shift.lunchStartTime && shift.lunchEndTime"
                  class="lunch-bar"
                  :style="calculateBarStyle(shift.lunchStartTime, shift.lunchEndTime)"
                  title="午餐时间"
              ></div>

              <!-- 晚餐时间条 -->
              <div
                  v-if="shift.dinnerStartTime && shift.dinnerEndTime"
                  class="dinner-bar"
                  :style="calculateBarStyle(shift.dinnerStartTime, shift.dinnerEndTime)"
                  title="晚餐时间"
              ></div>
            </div>
          </div>
        </div>

        <!-- 确定和取消按钮 -->
        <div style="margin-top: 20px;">
          <el-button @click="applySchedule" type="success">确定</el-button>
          <el-button @click="clearSchedule" type="danger">取消</el-button>
        </div>


        <!-- 班次详情弹窗 -->
        <div v-if="showShiftModal" class="modal-overlay">
          <div class="modal">
            <h3>班次详情</h3>
            <p><strong>开始时间:</strong> {{ selectedShift.startTime }}</p>
            <p><strong>结束时间:</strong> {{ selectedShift.endTime }}</p>
            <p><strong>是否有午餐:</strong> {{ selectedShift.lunchStartTime ? '是' : '否' }}</p>
            <p v-if="selectedShift.lunchStartTime"><strong>午餐时间:</strong> {{ selectedShift.lunchStartTime }} - {{ selectedShift.lunchEndTime }}</p>
            <p><strong>是否有晚餐:</strong> {{ selectedShift.dinnerStartTime ? '是' : '否' }}</p>
            <p v-if="selectedShift.dinnerStartTime"><strong>晚餐时间:</strong> {{ selectedShift.dinnerStartTime }} - {{ selectedShift.dinnerEndTime }}</p>
            <p><strong>当前员工:</strong> {{ selectedShift.employeeName || '未分配' }}</p>

            <button @click="closeModal">关闭</button>
          </div>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeeklySchedule',
  data() {
    return {
      // 一周排班数据
      weekSchedule: [],  // 存储后端返回的排班数据
      selectedDay: '周一',   // 当前选中的星期
      daySchedule: [],     // 当前选中日期的排班
      weekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      colors: [
        "#01D4F2",
        "#D8DF20",
        "#FFE550",
        "#F6931E",
        "#BFA",
        "#FF646C",
        "#CB3398",
        "#33E680",
        "#B334FF",
      ],


      timeSlots: [
        "09:00", "11:00", "13:00",
        "15:00", "17:00", "19:00",
        "21:00",
      ],
      // 员工排班数据
      shifts: [
          {employeeName: 'h1', startTime: '9:00', endTime: '10:00', lunchStartTime: '11:00', lunchEndTime: '12:00'}
      ],
      // 选中的日期（默认今天）
      selectedDate: new Date().toISOString().slice(0, 10),
      // 弹窗显示状态
      showShiftModal: false,
      // 当前选中的班次
      selectedShift: null,
      // 空闲员工列表
      employeeList: [],
      // 新选中的员工
      selectedEmployee: null,
    };
  },
  methods: {
    // 一键生成排班方案
    generateSchedule() {
      this.$http({
        method: 'GET',
        url: 'http://localhost:9999/generateWeeklySchedule',  // 假设的接口地址
      }).then((response) => {
        if (response.data.code === 200) {
          this.weekSchedule = response.data.data;  // 存储返回的排班数据
        } else {
          this.$message.error('获取排班方案失败');
        }
      }).catch((error) => {
        this.$message.error('网络错误');
      });
    },

    // 查看指定周的排班
    viewSchedule(day) {
      this.selectedDay = day;
      const dayIndex = this.weekDays.indexOf(day);
      if (this.weekSchedule && this.weekSchedule[dayIndex]) {
        this.daySchedule = this.weekSchedule[dayIndex];  // 获取当天的排班数据
      } else {
        this.daySchedule = [];
      }
    },

    // 应用当前排班方案
    applySchedule() {
      this.$http({
        method: 'POST',
        url: 'http://localhost:9999/applySchedule',  // 假设的接口地址
        data: {
          day: this.selectedDay,
          schedule: this.daySchedule,
        },
      }).then((response) => {
        if (response.data.code === 200) {
          this.$message.success('排班方案已应用');
        } else {
          this.$message.error('应用排班方案失败');
        }
      }).catch((error) => {
        this.$message.error('网络错误');
      });
    },

    // 清空当前选中的排班
    clearSchedule() {
      this.selectedDay = null;
      this.daySchedule = [];
    },

    // 打开班次详情弹窗
    openShiftDetails(shift) {
      this.selectedShift = { ...shift }; // 克隆选中的班次
      this.showShiftModal = true; // 显示弹窗
    },


    // 计算班次条的位置和宽度
    calculateBarStyle(startTime, endTime) {
      const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      // 时间范围调整为 08:00 - 23:00
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      const totalMinutes = timeToMinutes("23:00") - timeToMinutes("08:00");
      const left = ((startMinutes - timeToMinutes("08:00")) / totalMinutes) * 100;
      const width = ((endMinutes - startMinutes) / totalMinutes) * 100;

      return {
        left: `${left}%`,
        width: `${width}%`,
        position: "absolute",
        height: "30px",
        borderRadius: "4px",
      };
    },

    // 关闭弹窗
    closeModal() {
      this.showShiftModal = false;
      this.selectedShift = null;
      this.employeeList = [];
      this.selectedEmployee = null;
    },
  },
};
</script>

<style scoped>
.schedule-wrapper {
  padding: 20px;
}

.el-button.is-active {
  background-color: #409eff;
  color: white;
}

.schedule-detail {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f9f9f9;
}

/* 时间轴样式 */
.time-axis {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
  padding-left: 80px; /* 给员工名字留出位置 */
}

.time-slot {
  flex: 1;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin-left: -1px;
}

/* 排班图表样式 */
.schedule-chart {
  display: flex;
  flex-direction: column;
}

/* 每个员工排班行 */
.employee-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

/* 员工姓名 */
.employee-name {
  width: 80px;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
}

/* 班次条容器 */
.shift-bars {
  flex: 1;
  position: relative;
  height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

/* 班次条样式 */
.shift-bar {
  position: absolute;
  top: 0;
  height: 30px;
  cursor: pointer;
  background-color: #01D4F2; /* 蓝色表示班次条 */
}

/* 午餐条样式（黄色） */
.lunch-bar {
  position: absolute;
  top: -10px; /* 显示在班次条上方 */
  height: 10px;
  background-color: #FFC107; /* 黄色表示午餐时间 */
  border-radius: 4px;
  z-index: 1;
}

/* 晚餐条样式（绿色） */
.dinner-bar {
  position: absolute;
  top: -20px; /* 显示在午餐条上方 */
  height: 10px;
  background-color: #4CAF50; /* 绿色表示晚餐时间 */
  border-radius: 4px;
  z-index: 1;
}


/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  z-index: 10000;
}

.modal select {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}

.modal button {
  background: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal button:hover {
  background: #45a049;
}
</style>
