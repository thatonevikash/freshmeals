"use client";

import Image from "next/image";

import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { Order, OrderStatus } from "@/types/order.type";

import { useGetOrders } from "@/actions/order";

import { LoadingScreen } from "@/components/loading";
import { DashboardContent } from "@/components/layout/main";

const STATUS_COLOR: Record<
  OrderStatus,
  "default" | "error" | "warning" | "success"
> = {
  Processing: "warning",
  Delivering: "default",
  Delivered: "success",
  Canceled: "error",
};

export function OrderListView() {
  const { data, isLoading, error } = useGetOrders();

  if (isLoading) return <LoadingScreen />;
  if (error) return <Alert severity="error">Unable to fetch orders.</Alert>;

  const orders: Order[] = data ?? [];

  return (
    <DashboardContent>
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My orders
        </Typography>

        {orders.length === 0 ? (
          <Alert severity="info">
            No orders found. Place your first order from the meals page.
          </Alert>
        ) : (
          <Stack spacing={2}>
            {orders.map((order, index) => (
              <Card
                key={`${order.order_date}-${index}`}
                sx={{ p: 2.5, borderRadius: 3 }}
              >
                <Stack spacing={2}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    sx={{ justifyContent: "space-between" }}
                    spacing={1}
                  >
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Ordered on
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {new Date(order.order_date).toLocaleString()}
                      </Typography>
                    </Stack>

                    <Chip
                      label={order.order_status}
                      color={STATUS_COLOR[order.order_status]}
                    />
                  </Stack>

                  <Stack spacing={1}>
                    {order.order_items.map((item, itemIndex) => {
                      const info =
                        item.type === "Meal" ? item.meal : item.plate;
                      const image =
                        item.type === "Meal"
                          ? item.meal.meal_img_url
                          : item.plate.plate_img_url;
                      const title =
                        item.type === "Meal"
                          ? item.meal.meal_name
                          : item.plate.plate_name;

                      return (
                        <Stack
                          key={`${title}-${itemIndex}`}
                          direction="row"
                          spacing={1.5}
                          sx={{
                            p: 1.2,
                            borderRadius: 2,
                            bgcolor: "action.hover",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={image}
                            alt={title}
                            width={56}
                            height={56}
                            style={{ borderRadius: 12 }}
                          />

                          <Stack sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.type} • Qty: {item.quantity} • $
                              {item.type === "Meal"
                                ? item.meal.meal_price
                                : item.plate.plate_price}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ mt: 0.5, alignItems: "center" }}
                            >
                              <Avatar
                                src={info.seller_information.seller.avatar_url}
                                alt={info.seller_information.seller.name}
                                sx={{ width: 22, height: 22 }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                noWrap
                              >
                                {info.seller_information.seller.name}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>

                  <Divider />

                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2">
                      Delivery details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mobile: {order.delivery_information.mobile_no}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Address: {order.delivery_information.address}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </DashboardContent>
  );
}
